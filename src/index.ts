import express from "express";
import dotenv from "dotenv";
import { getPool } from "./db/config";

// Route imports
import registerOrderRoutes from "./routers/orders.routes";
import { registerStageRoutes } from "./routers/staged.routes";
import designRoutes from "./routers/design.routes";
import userRoutes from "./routers/user.routes";
import deliveryRoutes from "./routers/delivery.routes";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Route registration
registerOrderRoutes(app);
registerStageRoutes(app);

app.use("/api/designs", designRoutes);
app.use("/api/users", userRoutes);
app.use("/api/deliveries", deliveryRoutes);

//  Root route
app.get("/", (_, res) => {
  res.send("🚀 Cake Management API is running...");
});

// Start server
const port = process.env.PORT || 8081;
app.listen(port, () => {
console.log(`🚀 Server running at http://localhost:${port}`);
});

// Database connection check
getPool()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((error) => console.error("❌ Error connecting to SQL Server:", error));
