import "dotenv/config";
import express from "express";
import type { Express, Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";
import { callAgent } from "./agent.ts";
import cors from "cors";
import compression from "compression";

const app: Express = express();

app.use(compression())
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_ATLAS_URI as string, {
  maxPoolSize: 50,
  minPoolSize: 10,
});

async function startServer() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to MongoDB Atlas");

    const db = client.db("inv_db");
    const collection = db.collection("items");
    await collection.createIndex({ categories: 1 });

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

        const [products, total] = await Promise.all([
          collection.find({}).skip(skip).limit(limit).toArray(),
          collection.countDocuments({}),
        ]);

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

        const [products, total] = await Promise.all([
          collection.find({ categories: category }).skip(skip).limit(limit).toArray(),
          collection.countDocuments({ categories: category }),
        ]);

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

    // Create product
    app.post("/admin/products", async (req: Request, res: Response) => {
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
    });

    // Update product
    app.put("/admin/products/:id", async (req: Request, res: Response) => {
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
    });

    // Delete product
    app.delete("/admin/products/:id", async (req: Request, res: Response) => {
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
    });

    // Get reports data
    app.get("/admin/reports", async (req: Request, res: Response) => {
      try {
        const db = client.db("inv_db");
        const itemsCollection = db.collection("items");
        const ordersCollection = db.collection("orders");
        const customersCollection = db.collection("customers");

        // Get total products
        const totalProducts = await itemsCollection.countDocuments();

        // Get all customers
        const customers = await customersCollection.find({}).toArray();

        // Get all orders
        const orders = await ordersCollection.find({}).toArray();

        // Calculate real stats
        const activeCustomers = customers.length;
        const revenue = orders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);
        const totalSales = orders.reduce((sum: number, order: any) => sum + order.items.reduce((itemSum: number, item: any) => itemSum + item.quantity, 0), 0);

        // Generate sales data by aggregating order items by product categories
        const categorySales: { [key: string]: number } = {};
        for (const order of orders) {
          for (const item of order.items) {
            // Find product to get categories
            const product = await itemsCollection.findOne({ _id: new ObjectId(item.productId) });
            if (product && product.categories) {
              product.categories.forEach((cat: string) => {
                categorySales[cat] = (categorySales[cat] || 0) + item.quantity;
              });
            }
          }
        }

        const salesData = Object.keys(categorySales).map(cat => ({
          name: cat,
          sales: categorySales[cat]
        }));

        // Generate customer distribution based on totalPurchases
        const customerSegments = {
          'New Customers': 0,
          'Returning Customers': 0,
          'VIP Customers': 0,
          'Corporate': 0
        };

        customers.forEach(customer => {
          const purchases = customer.totalPurchases || 0;
          if (purchases < 100) customerSegments['New Customers']++;
          else if (purchases < 500) customerSegments['Returning Customers']++;
          else if (purchases < 2000) customerSegments['VIP Customers']++;
          else customerSegments['Corporate']++;
        });

        const customerData = Object.keys(customerSegments).map((name: string) => ({
          name,
          value: customerSegments[name as keyof typeof customerSegments]
        }));

        // Get top 10 customers by totalPurchases
        const customerList = customers
          .sort((a, b) => (b.totalPurchases || 0) - (a.totalPurchases || 0))
          .slice(0, 10)
          .map((customer, index) => ({
            id: index + 1,
            name: customer.name,
            email: customer.email,
            totalPurchases: customer.totalPurchases || 0,
            lastPurchase: customer.lastPurchase ? new Date(customer.lastPurchase).toISOString().split('T')[0] : 'N/A'
          }));

        // Calculate price statistics from products
        const products = await itemsCollection.find({}).toArray();
        const priceStats = products.reduce((acc, product) => {
          const fullPrice = product.prices?.full_price || 0;
          const salePrice = product.prices?.sale_price || 0;
          acc.totalFullPrice += fullPrice;
          acc.totalSalePrice += salePrice;
          acc.minPrice = Math.min(acc.minPrice, salePrice);
          acc.maxPrice = Math.max(acc.maxPrice, fullPrice);
          return acc;
        }, {
          totalFullPrice: 0,
          totalSalePrice: 0,
          minPrice: Infinity,
          maxPrice: 0
        });

        const avgFullPrice = totalProducts > 0 ? Math.round(priceStats.totalFullPrice / totalProducts) : 0;
        const avgSalePrice = totalProducts > 0 ? Math.round(priceStats.totalSalePrice / totalProducts) : 0;
        const totalCategories = Object.keys(categorySales).length;

        res.json({
          salesData,
          customerData,
          customerList,
          stats: {
            totalProducts,
            totalSales,
            activeCustomers,
            revenue,
            avgFullPrice,
            avgSalePrice,
            totalCategories
          }
        });
      } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ error: "Failed to fetch reports" });
      }
    });

    // Create orders collection and handle orders
    app.post("/orders", async (req: Request, res: Response) => {
      try {
        const db = client.db("inv_db");
        const ordersCollection = db.collection("orders");

        const orderData = {
          ...req.body,
          createdAt: new Date(),
          status: "completed", // Mark as completed since payment is processed
        };

        const result = await ordersCollection.insertOne(orderData);

        // Update customer purchase history for reports
        const customerCollection = db.collection("customers");
        const customerEmail = orderData.customer.email;

        // Check if customer exists
        const existingCustomer = await customerCollection.findOne({ email: customerEmail });

        if (existingCustomer) {
          // Update existing customer
          await customerCollection.updateOne(
            { email: customerEmail },
            {
              $inc: { totalPurchases: orderData.totalAmount },
              $set: { lastPurchase: orderData.orderDate, name: orderData.customer.name },
              $push: { orders: result.insertedId }
            }
          );
        } else {
          // Create new customer
          await customerCollection.insertOne({
            name: orderData.customer.name,
            email: customerEmail,
            phone: orderData.customer.phone,
            address: orderData.customer.address,
            totalPurchases: orderData.totalAmount,
            lastPurchase: orderData.orderDate,
            orders: [result.insertedId],
            createdAt: new Date(),
          });
        }

        res.json({ success: true, orderId: result.insertedId });
      } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
      }
    });

    // Get customer data for reports
    app.get("/admin/customers", async (req: Request, res: Response) => {
      try {
        const db = client.db("inv_db");
        const customerCollection = db.collection("customers");

        const customers = await customerCollection.find({}).toArray();

        // Sort by total purchases descending and take top 10
        const topCustomers = customers
          .sort((a, b) => b.totalPurchases - a.totalPurchases)
          .slice(0, 10)
          .map((customer, index) => ({
            id: index + 1,
            name: customer.name,
            email: customer.email,
            totalPurchases: customer.totalPurchases,
            lastPurchase: customer.lastPurchase.split('T')[0], // Format date
          }));

        res.json(topCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: "Failed to fetch customers" });
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
