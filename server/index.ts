import "dotenv/config";
import express from "express";
import type { Express, Request, Response } from "express";
import { MongoClient } from "mongodb";
import { callAgent } from "./agent.ts";
import cors from "cors";
import bcrypt from "bcryptjs";

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

    // Thêm route đăng ký người dùng  
    app.post("/register", async (req: Request, res: Response) => {
      try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
          return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin" });
        }
        const db = client.db("inv_db");
        const usersCollection = db.collection("users");

        // Kiểm tra xem username hoặc email đã tồn tại chưa
        const existingUser = await usersCollection.findOne({
          $or: [{ username }, { email }],
        });
        if (existingUser) {
          return res.status(409).json({ error: "Tên đăng nhập hoặc email đã tồn tại" });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Lưu người dùng mới vào database
        await usersCollection.insertOne({
          username,
          email,
          password: hashedPassword,
        });

        res.status(201).json({ message: "Đăng ký thành công" });
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).json({ error: "Lỗi máy chủ" });
      }
    });

    // Thêm route đăng nhập người dùng
    app.post("/login", async (req: Request, res: Response) => {
      try {
        const { username, password } = req.body;
        if (!username || !password) {
          return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin" });
        }
        const db = client.db("inv_db");
        const usersCollection = db.collection("users");

        // Tìm người dùng theo username
        const user = await usersCollection.findOne({ username });
        if (!user) {
          return res.status(401).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
        }

        // So sánh mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
        }

        // Đăng nhập thành công
        res.status(200).json({ message: "Đăng nhập thành công" });
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ error: "Lỗi máy chủ" });
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
