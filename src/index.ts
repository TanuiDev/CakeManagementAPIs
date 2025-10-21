import express from "express";

import { getPool } from "./db/config";
import registerOrderRoutes from "./routers/orders.routes";




const app = express();

app.use(express.json());

//register routes here

registerOrderRoutes(app);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


getPool()
  .then((pool) => {
    console.log("Connected to SQL Server");
  })
  .catch((error) => {
    console.error("Error connecting to SQL Server:", error);
  });
