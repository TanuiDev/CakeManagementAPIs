import sql from 'mssql';
import { getPool } from '../db/config';



export const getAllOrders = async () => {
  const pool = await getPool();
  const result = await pool.request().query('SELECT * FROM Cake_Orders');
  return result.recordset;
};
