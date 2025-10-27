import express from "express";
import { getPool } from "./db/config";

// ✅ Import route registration functions
import registerOrderRoutes from "./routers/orders.routes";
<<<<<<< HEAD
import registerDesignRoutes from "./routers/design.routes";
import registerUserRoutes from "./routers/user.routes";
import registerCakeRoutes from "./routers/readycakes.routes";
=======
import designRoutes from "./routers/design.routes";
import userRoutes from "./routers/user.routes"; 
import { registerStageRoutes } from "./routers/staged.routes";
>>>>>>> 9850407e22e4af014f4753ec87a154eef973e492

const app = express();
app.use(express.json());

<<<<<<< HEAD
// ✅ Register all routes in the same consistent style
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
=======

registerOrderRoutes(app);
registerStageRoutes(app);
app.use("/design", designRoutes);
app.use("/users", userRoutes); 




>>>>>>> 9850407e22e4af014f4753ec87a154eef973e492

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`🚀 Server running at ${port}`);
});

getPool()
<<<<<<< HEAD
  .then(() => console.log(" Database connected"))
  .catch(error => console.error(" Error connecting to SQL Server:", error));
=======
  .then(() => console.log("Database connected successfully"))
  .catch(error => console.error("Error connecting to SQL Server:", error));
>>>>>>> 9850407e22e4af014f4753ec87a154eef973e492
