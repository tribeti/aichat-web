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

    // root
    app.get("/", (req: Request, res: Response) => {
      res.send("lang server");
    });

    // fetch all products
    app.get("/products", async (req: Request, res: Response) => {
      try {
        const db = client.db("inv_db");
        const collection = db.collection("items");
        const products = await collection.find({}).toArray();
        res.json(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
      }
    });

    // fetch by category
    app.get("/products/category/:cat", async (req, res) => {
      try {
        const category = req.params.cat;
        const db = client.db("inv_db");
        const collection = db.collection("items");

        const products = await collection
          .find({ categories: category })
          .toArray();

        res.json(products);
      } catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).json({ error: "Failed to fetch products" });
      }
    });

    // fetch item by id
    app.get("/products/:id", async (req: Request, res: Response) => {
      try {
        const id = req.params.id;
        const db = client.db("inv_db");
        const collection = db.collection("items");
        const { ObjectId } = await import("mongodb");
        const item = await collection.findOne({ _id: new ObjectId(id) });
        if (!item) {
          return res.status(404).json({ error: "Item not found" });
        }
        res.json(item);
      } catch (error) {
        console.error("Error fetching item by id:", error);
        res.status(500).json({ error: "Failed to fetch item" });
      }
    });

    // chat with AI
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

    // chat with previous data to AI
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

    // init port and run server
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
