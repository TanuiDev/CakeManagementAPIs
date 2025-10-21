import sql from 'mssql';
import { getPool } from '../db/config';



export const getAllOrders = async () => {
  const pool = await getPool();
  const result = await pool.request().query('SELECT * FROM Cake_Orders');
  return result.recordset;
};

export const getOrderById = async (orderId: number) => {
  const pool = await getPool();
  const result = await pool
  .request()
  .input('Id', sql.Int, orderId)
  .query('SELECT * FROM Cake_Orders WHERE Id = @Id');
  return result.recordset[0];
}