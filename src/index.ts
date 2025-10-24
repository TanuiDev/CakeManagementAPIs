import express from "express";
import { getPool } from "./db/config";
import registerOrderRoutes from "./routers/orders.routes";
import designRoutes from "./routers/design.routes";
import userRoutes from "./routers/user.routes"; // ✅ Added

const app = express();
app.use(express.json());

// ✅ Register routes
registerOrderRoutes(app);
app.use("/design", designRoutes);
app.use("/users", userRoutes); // ✅ Enables /users route

// ✅ Root route
app.get("/", (_, res) => {
  res.send("Hello, express API is running...");
});

// ✅ Optional direct DB route (for testing)
app.get("/designs-db", (req, res) => {
  getPool()
    .then(pool => pool.request().query("SELECT * FROM Cake_Designs"))
    .then(result => res.json(result.recordset))
    .catch(err => {
      console.log("SQL error", err);
      res.status(500).send("Server error");
    });
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`🚀 Server running at: http://localhost:${port}`);
});

getPool()
  .then(() => console.log("Database connected"))
  .catch(error => console.error("Error connecting to SQL Server:", error));
