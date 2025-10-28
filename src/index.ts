import express, { Application, Request, Response } from "express";

import { getPool } from "./db/config";
import dotenv from "dotenv"

dotenv.config()

// Route imports
import deliveryRoutes from "./routers/delivery.routes";
import registerOrderRoutes from "./routers/orders.routes";
import registerDesignRoutes from "./routers/design.routes";
import registerUserRoutes from "./routers/user.routes";
import registerCakeRoutes from "./routers/readycakes.routes";



const app: Application = express();

app.use(express.json());

//routers
app.use("/api/deliveries", deliveryRoutes);
registerOrderRoutes(app);
registerDesignRoutes(app);
registerUserRoutes(app);
registerCakeRoutes(app);



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
