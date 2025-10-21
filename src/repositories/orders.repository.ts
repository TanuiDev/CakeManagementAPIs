import sql from 'mssql';
import { getPool } from '../db/config';
import { NewOrder } from '../types/orders.types';



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

export const createOrder = async (orderData: NewOrder) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('DesignId',orderData.DesignId ?? null)
      .input('UserId', sql.Int, orderData.UserId)
      .input('Size', sql.VarChar(50), orderData.Size)
      .input('Flavor', sql.VarChar(100), orderData.Flavor)
      .input('Message', sql.VarChar(255), orderData.Message ?? null)
      .input('Status', sql.VarChar(50), orderData.Status ?? 'Pending')
      .input('DeliveryDate', sql.DateTime, orderData.DeliveryDate)
      .input('Notes', sql.VarChar(sql.MAX), orderData.Notes ?? null)
      .input('ExtendedDescription', sql.VarChar(sql.MAX), orderData.ExtendedDescription ?? null)
      .input('SampleImages', sql.NVarChar(sql.MAX), orderData.SampleImages ? JSON.stringify(orderData.SampleImages) : null)
      .input('ColorPreferences', sql.NVarChar(sql.MAX), orderData.ColorPreferences ? JSON.stringify(orderData.ColorPreferences) : null)
    .query('INSERT INTO Cake_Orders (DesignId, UserId, Size, Flavor, Message, Status, DeliveryDate, Notes, ExtendedDescription, SampleImages, ColorPreferences)VALUES (@DesignId, @UserId, @Size, @Flavor, @Message, @Status, @DeliveryDate, @Notes, @ExtendedDescription, @SampleImages, @ColorPreferences)');
  return result.recordset;
    




}

export const updateOrderStatus = async (orderId: number, Status: string) => {
  const pool = await getPool();
await pool
    .request()
    .input('Id',  orderId)
    .input('Status', Status)
    .query('UPDATE Cake_Orders SET Status = @Status WHERE Id = @Id');
  return "Order status updated";
}


export const deleteOrder = async(orderId: number) => {
  const pool = await getPool();
  await pool
    .request()
    .input('Id', orderId)
    .query('DELETE FROM Cake_Orders WHERE Id = @Id');
  return "Order deleted";
}

export const getOrdersByUserId = async (userId: number) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input('UserId',userId)
    .query('SELECT * FROM Cake_Orders WHERE UserId = @UserId');
  return result.recordset;
};

