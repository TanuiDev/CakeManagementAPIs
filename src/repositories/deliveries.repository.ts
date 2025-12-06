import { getPool } from "../db/config";
import { Delivery } from "../types/delivery.types";

export const getAllDeliveries = async () => {
  const pool = await getPool();
  const result = await pool.request().query("SELECT * FROM Deliveries");
  return result.recordset;
};

export const getDeliveryById = async(DeliveryID:number)=>{
  const pool=await getPool()
  const results = await pool
  .request()
  .input("DeliveryID",DeliveryID)
  .query("SELECT * FROM Deliveries WHERE DeliveryID=@DeliveryID")

  return results.recordset[0];
}

export const createDelivery = async (delivery: Delivery)=> {
  const pool = await getPool();
  await pool
    .request()
    .input("OrderId", delivery.OrderId)
    .input("DeliveryAddress", delivery.DeliveryAddress)
    .input("DeliveryDate", delivery.DeliveryDate)
    .input("CourierName", delivery.CourierName)
    .input("CourierContact", delivery.CourierContact)
    .input("Status", delivery.Status)
    .query(
      "INSERT INTO Deliveries (OrderId, DeliveryAddress, DeliveryDate, CourierName, CourierContact, Status) VALUES (@OrderId, @DeliveryAddress, @DeliveryDate, @CourierName, @CourierContact, @Status)",
    );
};

export const updateDelivery = async (
  id: number,
  delivery: Delivery,
)=> {
  const pool = await getPool();
  await pool
    .request()
    .input("id", id)
    .input("OrderId", delivery.OrderId)
    .input("DeliveryDate", delivery.DeliveryDate)
    .input("Status", delivery.Status)
    .query(
      `UPDATE Deliveries 
       SET OrderId = @OrderId, DeliveryDate = @DeliveryDate, Status = @Status
       WHERE id = @id`,
    );
};

export const deleteDelivery = async (id: number)=> {
  const pool = await getPool();
  await pool
    .request()
    .input("id", id)
    .query("DELETE FROM Deliveries WHERE id = @id");
};
