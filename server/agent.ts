import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { StateGraph } from "@langchain/langgraph";
import { Annotation } from "@langchain/langgraph";
import { tool } from "@langchain/core/tools";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import { z } from "zod";
import "dotenv/config";

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.status === 429 && attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
        console.log(`Rate limit hit. Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}

export async function callAgent(
  client: MongoClient,
  query: string,
  thread_id: string
) {
  try {
    const dbName = "inv_db";
    const db = client.db(dbName);
    const collection = db.collection("items");

    const GraphState = Annotation.Root({
      messages: Annotation<BaseMessage[]>({
        reducer: (x, y) => x.concat(y), // Simply concatenate old messages (x) with new messages (y)
      }),
    });

    const itemLookupTool = tool(
      async ({ query, n = 10 }) => {
        try {
          console.log("Item lookup tool called with query:", query);

          const totalCount = await collection.countDocuments();
          console.log(`Total documents in collection: ${totalCount}`);

          if (totalCount === 0) {
            console.log("Collection is empty");
            return JSON.stringify({
              error: "No items found in inventory",
              message: "The inventory database appears to be empty",
              count: 0,
            });
          }

          const sampleDocs = await collection.find({}).limit(3).toArray();
          console.log("Sample documents:", sampleDocs);

          const dbConfig = {
            collection: collection, // MongoDB collection to search
            indexName: "vector_index", // Name of the vector search index
            textKey: "embedding_text", // Field containing the text used for embeddings
            embeddingKey: "embedding", // Field containing the vector embeddings
          };

          // Create vector store instance for semantic search using Google Gemini embeddings
          const vectorStore = new MongoDBAtlasVectorSearch(
            new GoogleGenerativeAIEmbeddings({
              apiKey: process.env.GOOGLE_API_KEY,
              model: "text-embedding-004", // Gemini embedding model
            }),
            dbConfig
          );

          console.log("Performing vector search...");
          const result = await vectorStore.similaritySearchWithScore(query, n);
          console.log(`Vector search returned ${result.length} results`);

          if (result.length === 0) {
            console.log(
              "Vector search returned no results, trying text search..."
            );
            const textResults = await collection
              .find({
                $or: [
                  { item_name: { $regex: query, $options: "i" } },
                  { item_description: { $regex: query, $options: "i" } },
                  { categories: { $regex: query, $options: "i" } },
                  { embedding_text: { $regex: query, $options: "i" } },
                ],
              })
              .limit(n)
              .toArray();

            console.log(`Text search returned ${textResults.length} results`);
            return JSON.stringify({
              results: textResults,
              searchType: "text",
              query: query,
              count: textResults.length,
            });
          }

          return JSON.stringify({
            results: result,
            searchType: "vector", // Indicate this was a vector search
            query: query,
            count: result.length,
          });
        } catch (error: any) {
          console.error("Error in item lookup:", error);
          console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name,
          });

          return JSON.stringify({
            error: "Failed to search inventory",
            details: error.message,
            query: query,
          });
        }
      },
      {
        name: "item_lookup", // Tool name that the AI will reference
        description:
          "Gathers furniture item details from the Inventory database", // Description for the AI
        schema: z.object({
          query: z.string().describe("The search query"), // Required string parameter
          n: z
            .number()
            .optional()
            .default(10) // Optional number parameter with default
            .describe("Number of results to return"),
        }),
      }
    );

    const tools = [itemLookupTool];
    const toolNode = new ToolNode<typeof GraphState.State>(tools);

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash", //  Use Gemini 1.5 Flash model
      temperature: 0, // Deterministic responses (no randomness)
      maxRetries: 0, // Disable built-in retries (we handle our own)
      apiKey: process.env.GOOGLE_API_KEY,
    }).bindTools(tools); // Bind our custom tools to the model

    // Decision function: determines next step in the workflow
    function shouldContinue(state: typeof GraphState.State) {
      const messages = state.messages; // Get all messages
      const lastMessage = messages[messages.length - 1] as AIMessage; // Get the most recent message

      if (lastMessage.tool_calls?.length) {
        return "tools"; // Route to tool execution
      }
      return "__end__"; // End the workflow
    }

    async function callModel(state: typeof GraphState.State) {
      return retryWithBackoff(async () => {
        // Wrap in retry logic
        const prompt = ChatPromptTemplate.fromMessages([
          [
            "system", // System message defines the AI's role and behavior
            `You are a helpful E-commerce Chatbot Agent for a furniture store. 

IMPORTANT: You have access to an item_lookup tool that searches the furniture inventory database. ALWAYS use this tool when customers ask about furniture items, even if the tool returns errors or empty results.

When using the item_lookup tool:
- If it returns results, provide helpful details about the furniture items
- If it returns an error or no results, acknowledge this and offer to help in other ways
- If the database appears to be empty, let the customer know that inventory might be being updated

Current time: {time}`,
          ],
          new MessagesPlaceholder("messages"), // Placeholder for conversation history
        ]);

        const formattedPrompt = await prompt.formatMessages({
          time: new Date().toISOString(), // Current timestamp
          messages: state.messages, // All previous messages
        });

        const result = await model.invoke(formattedPrompt);
        return { messages: [result] };
      });
    }

    const workflow = new StateGraph(GraphState)
      .addNode("agent", callModel) // Add AI model node
      .addNode("tools", toolNode) // Add tool execution node
      .addEdge("__start__", "agent") // Start workflow at agent
      .addConditionalEdges("agent", shouldContinue) // Agent decides: tools or end
      .addEdge("tools", "agent"); // After tools, go back to agent

    const checkpointer = new MongoDBSaver({ client, dbName });
    const app = workflow.compile({ checkpointer });
    const finalState = await app.invoke(
      {
        messages: [new HumanMessage(query)], // Start with user's question
      },
      {
        recursionLimit: 15,
        configurable: { thread_id: thread_id }, // Conversation thread identifier
      }
    );

    const response =
      finalState.messages[finalState.messages.length - 1].content;
    console.log("Agent response:", response);

    return response; // Return the AI's final response
  } catch (error: any) {
    console.error("Error in callAgent:", error.message);

    if (error.status === 429) {
      throw new Error(
        "Service temporarily unavailable due to rate limits. Please try again in a minute."
      );
    } else if (error.status === 401) {
      throw new Error(
        "Authentication failed. Please check your API configuration."
      );
    } else {
      throw new Error(`Agent failed: ${error.message}`);
    }
  }
}
