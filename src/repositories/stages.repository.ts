import { getPool } from "../db/config";

import sql from "mssql";


export const getAllStages = async () => {
  const pool = await getPool();
  const result = await pool.request().query('SELECT * FROM Cake_Stages');
  return result.recordset;
}


export const getOrderStages = async (orderId: number) => {
  const pool = await getPool();
  const result = await pool.request()
    .input('OrderId', sql.Int, orderId)
    .query('SELECT * FROM Cake_Stages WHERE OrderId = @OrderId');
  return result.recordset;
}

export const getStageById = async (Id: number) => {
  const pool = await getPool();
  const result = await pool.request()
    .input('Id',  Id)
    .query('SELECT * FROM Cake_Stages WHERE Id = @Id');
  return result.recordset[0];
}
