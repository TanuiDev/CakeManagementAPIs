import express from "express";
import { getPool } from "./db/config";
import registerOrderRoutes from "./routers/orders.routes";
import designRoutes from "../src/routers/design.routes";

const app = express();
app.use(express.json());

// ✅ Register routes
registerOrderRoutes(app);
app.use("/design", designRoutes); // <— this enables /design routes

// ✅ Root route
app.get("/", (_, res) => {
  res.send("Hello, express API is running...");
});

// (Optional) Direct DB query route (not needed if designRoutes is working)
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
