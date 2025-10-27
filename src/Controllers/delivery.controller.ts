
import { Request, Response } from "express";
import { getPool } from "../db/config";

// POST /api/deliveries - Schedule a delivery
export const scheduleDelivery = async (req: Request, res: Response) => {
  const { orderId, deliveryAddress, deliveryDate, courierName, courierContact, status } = req.body;

  if (!orderId || !deliveryAddress || !deliveryDate) {
    return res.status(400).json({ message: "Missing required fields: orderId, deliveryAddress, deliveryDate" });
  }

  try {
    const pool = await getPool();

    const result = await pool
      .request()
      .input("OrderID", orderId)
      .input("DeliveryAddress", deliveryAddress)
      .input("DeliveryDate", deliveryDate)
      .input("CourierName", courierName || null)
      .input("CourierContact", courierContact || null)
      .input("Status", status || "Scheduled")
      .query(`
        INSERT INTO Deliveries (OrderID, DeliveryAddress, DeliveryDate, CourierName, CourierContact, Status)
        OUTPUT INSERTED.*
        VALUES (@OrderID, @DeliveryAddress, @DeliveryDate, @CourierName, @CourierContact, @Status)
      `);

    res.status(201).json({
      message: "Delivery scheduled successfully",
      delivery: result.recordset[0],
    });
  } catch (error) {
    console.error("Error scheduling delivery:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
