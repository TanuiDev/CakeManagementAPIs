import express from "express";

import { getPool } from "./db/config";



const app = express();

app.use(express.json());

//register routes here





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
