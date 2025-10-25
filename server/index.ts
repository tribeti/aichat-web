import "dotenv/config";
import express from "express";
import type { Express, Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";
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
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        const products = await collection
          .find({})
          .skip(skip)
          .limit(limit)
          .toArray();
        const total = await collection.countDocuments({});

        res.json({ products, total, page, limit });
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
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        const products = await collection
          .find({ categories: category })
          .skip(skip)
          .limit(limit)
          .toArray();

        const total = await collection.countDocuments({ categories: category });

        res.json({ products, total, page, limit });
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
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Failed to fetch product" });
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

    // Admin middleware
    const adminAuth = (req: Request, res: Response, next: Function) => {
      const adminAuth = req.headers["x-admin-auth"];
      if (adminAuth !== "authenticated") {
        return res.status(403).json({ error: "Unauthorized" });
      }
      next();
    };

    // Create product
    app.post(
      "/admin/products",
      adminAuth,
      async (req: Request, res: Response) => {
        try {
          const db = client.db("inv_db");
          const collection = db.collection("items");
          const product = req.body;
          // Generate item_id if not provided
          if (!product.item_id) {
            product.item_id = new ObjectId().toString();
          }
          const result = await collection.insertOne(product);
          res.json({ success: true, id: result.insertedId });
        } catch (error) {
          console.error("Error creating product:", error);
          res.status(500).json({ error: "Failed to create product" });
        }
      },
    );

    // Update product
    app.put(
      "/admin/products/:id",
      adminAuth,
      async (req: Request, res: Response) => {
        try {
          const id = req.params.id;
          const db = client.db("inv_db");
          const collection = db.collection("items");
          const updates = req.body;
          const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updates },
          );
          if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Product not found" });
          }
          res.json({ success: true });
        } catch (error) {
          console.error("Error updating product:", error);
          res.status(500).json({ error: "Failed to update product" });
        }
      },
    );

    // Delete product
    app.delete(
      "/admin/products/:id",
      adminAuth,
      async (req: Request, res: Response) => {
        try {
          const id = req.params.id;
          const db = client.db("inv_db");
          const collection = db.collection("items");
          const result = await collection.deleteOne({ _id: new ObjectId(id) });
          if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Product not found" });
          }
          res.json({ success: true });
        } catch (error) {
          console.error("Error deleting product:", error);
          res.status(500).json({ error: "Failed to delete product" });
        }
      },
    );

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
