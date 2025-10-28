import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { getPool } from "./db/config";

// Route imports
import deliveryRoutes from "./routers/delivery.routes";
import registerOrderRoutes from "./routers/orders.routes";
import registerDesignRoutes from "./routers/design.routes";
import registerUserRoutes from "./routers/user.routes";
import registerCakeRoutes from "./routers/readycakes.routes";

dotenv.config();

const app: Application = express();

app.use(express.json());

//routers
app.use("/api/deliveries", deliveryRoutes);
registerOrderRoutes(app);
registerDesignRoutes(app);
registerUserRoutes(app);
registerCakeRoutes(app);

// Root route
app.get("/", (_: Request, res: Response) => {
  res.send("🚀 Express API is running successfully!");
});

// Test route to check DB connection
app.get("/designs-db", async (_: Request, res: Response) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Cake_Designs");
    res.json(result.recordset);
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, async () => {
  console.log(`✅ Server running on: http://localhost:${PORT}`);

  try {
    await getPool();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Error connecting to SQL Server:", error);
  }
});
