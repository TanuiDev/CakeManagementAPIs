import express from "express";
import { getPool } from "./db/config";
import registerOrderRoutes from "./routers/orders.routes";
import designRoutes from "./routers/design.routes";
import userRoutes from "./routers/user.routes"; 
import { registerStageRoutes } from "./routers/staged.routes";

const app = express();
app.use(express.json());

// ✅ Register routes
registerOrderRoutes(app);
registerStageRoutes(app);
app.use("/design", designRoutes);
app.use("/users", userRoutes); 





const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`🚀 Server running at ${port}`);
});

getPool()
  .then(() => console.log("Database connected successfully"))
  .catch(error => console.error("Error connecting to SQL Server:", error));
