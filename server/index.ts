import "dotenv/config";
import express from "express";
import type { Express, Request, Response } from "express";
import { MongoClient } from "mongodb";
import { callAgent } from "./agent.ts";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_ATLAS_URI as string);

async function startServer() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to MongoDB Atlas");

    app.get("/", (req: Request, res: Response) => {
      res.send("lang server");
    });

    app.post("/chat", async (req: Request, res: Response) => {
      const initialMessage = req.body.message;
      const threadId = Date.now().toString();
      console.log(initialMessage);
      try {
        const response = await callAgent(client, initialMessage, threadId);
        res.json({ threadId, response });
      } catch (error) {
        console.error("error start ", error);
        res.status(500).json({ error: "server error" });
      }
    });

    app.post("/chat/:threadId", async (req: Request, res: Response) => {
      const { threadId } = req.params;
      const { message } = req.body;
      try {
        const response = await callAgent(client, message, threadId);
        res.json({ response });
      } catch (error) {
        console.error("chat error", error);
        res.status(500).json({ error: "server error" });
      }
    });

    const PORT = process.env.PORT || 5070;
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  } catch (error) {
    console.error("error connect to mongodb", error);
    process.exit(1);
  }
}

startServer();
