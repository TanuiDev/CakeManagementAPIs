import { getPool } from "../db/config";
import { Delivery } from "../types/delivery.types";

export const getAllDeliveries = async (): Promise<Delivery[]> => {
  const pool = await getPool();
  const result = await pool.request().query("SELECT * FROM Deliveries");
  return result.recordset;
};

export const getDeliveryById = async (id: number): Promise<Delivery | null> => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", id)
    .query("SELECT * FROM Deliveries WHERE id = @id");
  return result.recordset[0] || null;
};

export const createDelivery = async (delivery: Delivery): Promise<void> => {
  const pool = await getPool();
  await pool
    .request()
    .input("OrderId", delivery.OrderId)
    .input("DeliveryDate", delivery.DeliveryDate)
    .input("Status", delivery.Status)
    .query(
      "INSERT INTO Deliveries (OrderId, DeliveryDate, Status) VALUES (@OrderId, @DeliveryDate, @Status)",
    );
};

export const updateDelivery = async (
  id: number,
  delivery: Delivery,
): Promise<void> => {
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

export const deleteDelivery = async (id: number): Promise<void> => {
  const pool = await getPool();
  await pool
    .request()
    .input("id", id)
    .query("DELETE FROM Deliveries WHERE id = @id");
};
