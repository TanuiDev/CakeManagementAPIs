import { getPool } from "../db/config";

import sql from "mssql";


export const getAllStages = async () => {
  const pool = await getPool();
  const result = await pool.request().query('SELECT * FROM Cake_Stages');
  return result.recordset;
}
