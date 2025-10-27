import express from "express";
import dotenv from "dotenv";
import { getPool } from "./db/config";



import deliveryRoutes from "./routers/delivery.routes";

// ✅ Import route registration functions
import registerOrderRoutes from "./routers/orders.routes";
import registerDesignRoutes from "./routers/design.routes";
import registerUserRoutes from "./routers/user.routes";
import registerCakeRoutes from "./routers/readycakes.routes";


const app = express();

// Middleware
app.use(express.json());


app.use("/api/deliveries", deliveryRoutes);


registerOrderRoutes(app);
registerDesignRoutes(app);
registerUserRoutes(app);
registerCakeRoutes(app);

// ✅ Root route
app.get("/", (_, res) => {
  res.send("Hello, Express API is running...");
});

// ✅ Optional: direct DB route (for testing)
app.get("/designs-db", (req, res) => {
  getPool()
    .then(pool => pool.request().query("SELECT * FROM Cake_Designs"))
    .then(result => res.json(result.recordset))
    .catch(err => {
      console.error("SQL error", err);
      res.status(500).send("Server error");
    });
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`🚀 Server running at ${port}`);

});



// Database connection check
getPool()

  .then(() => console.log(" Database connected"))
  .catch(error => console.error(" Error connecting to SQL Server:", error));

