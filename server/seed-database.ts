import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { MongoClient } from "mongodb";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { promise, record, z } from "zod";
import "dotenv/config";

const client = new MongoClient(process.env.MONGODB_ATLAS_URI as string);

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

const itemSchema = z.object({
  item_id: z.string(),
  item_name: z.string(),
  item_description: z.string(),
  brand: z.string(),
  manufacturer_address: z.object({
    city: z.string(),
    postal_code: z.string(),
    country: z.string(),
  }),
  prices: z.object({
    full_price: z.number(),
    sale_price: z.number(),
  }),
  categories: z.array(z.string()),
  user_reviews: z.array(
    z.object({
      review_date: z.string(),
      rating: z.number(),
      comment: z.string(),
    })
  ),
  notes: z.string(),
});

type item = z.infer<typeof itemSchema>;
const parser = StructuredOutputParser.fromZodSchema(z.array(itemSchema));

async function setupdbandcollection(): Promise<void> {
  console.log("setting up");
  const db = client.db("inv_db");
  const collection = await db.listCollections({ name: "items" }).toArray();

  if (collection.length == 0) {
    await db.createCollection("items");
    console.log("created coll in db");
  } else {
    console.log("coll is existed in db");
  }
}

async function createvectorsearch(): Promise<void> {
  try {
    const db = client.db("inv_db");
    const collection = db.collection("items");
    await collection.dropIndexes();
    const vectorSearchIdx = {
      name: "vector_index",
      type: "vectorSearch",
      definition: {
        fields: [
          {
            type: "vector",
            path: "embedding",
            numDimensions: 768,
            similarity: "cosine",
          },
        ],
      },
    };
    console.log("Creating vector search index...");
    await collection.createSearchIndex(vectorSearchIdx);
    console.log("Successfully created vector search index");
  } catch (e) {
    console.error("Failed to create vector search index:", e);
  }
}

async function generateSyntheticData(): Promise<item[]> {
  const prompt = `You are a helpful assistant that generates furniture store item data. Generate 50 furniture store items. Each record should include the following fields: item_id, item_name, item_description, brand, manufacturer_address, prices, categories, user_reviews, notes. Ensure variety in the data and realistic values.
  ${parser.getFormatInstructions()}`;

  console.log("Generating synthetic data...");
  const response = await llm.invoke(prompt);
  return parser.parse(response.content as string);
}

async function createItemSummary(item: item): Promise<string> {
  return new Promise((resolve) => {
    const manufacturerDetails = `Made in ${item.manufacturer_address.country}`;
    const categories = item.categories.join(", ");
    const userReviews = item.user_reviews
      .map(
        (review) =>
          `Rated ${review.rating} on ${review.review_date}: ${review.comment}`
      )
      .join(" ");
    const basicInfo = `${item.item_name} ${item.item_description} from the brand ${item.brand}`;
    const price = `At full price it costs: ${item.prices.full_price} USD, On sale it costs: ${item.prices.sale_price} USD`;
    const notes = item.notes;

    const summary = `${basicInfo}. Manufacturer: ${manufacturerDetails}. Categories: ${categories}. Reviews: ${userReviews}. Price: ${price}. Notes: ${notes}`;
    resolve(summary);
  });
}

async function seeddb(): Promise<void> {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("success connect to db");

    await setupdbandcollection();
    await createvectorsearch();

    const db = client.db("inv_db");
    const collection = db.collection("items");

    await collection.deleteMany({});
    console.log("clear data");

    const syntheticData = await generateSyntheticData();
    const recordswithsummary = await Promise.all(
      syntheticData.map(async (record) => ({
        pageContent: await createItemSummary(record),
        metadata: { ...record },
      }))
    );

    for (const record of recordswithsummary) {
      await MongoDBAtlasVectorSearch.fromDocuments(
        [record],
        new GoogleGenerativeAIEmbeddings({
          apiKey: process.env.GOOGLE_API_KEY,
          modelName: "text-embedding-004",
        }),
        {
          collection,
          indexName: "vector_index",
          textKey: "embedding_text",
          embeddingKey: "embedding",
        }
      );
      console.log("success save", record.metadata.item_id);
    }
    console.log("database seeding complete");
  } catch (error) {
    console.error("error seeding db", error);
  } finally {
    await client.close();
  }
}

seeddb().catch(console.error);
