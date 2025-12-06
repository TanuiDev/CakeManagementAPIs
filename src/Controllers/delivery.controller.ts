import { Request, Response } from "express";
import { getPool } from "../db/config";
import * as DeliveryService from "../service/delivery.service";

export const getAllDeliveries = async (req: Request, res: Response) => {
  try {
    const deliveries = await DeliveryService.DeliveryService.getAll();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching deliveries", error });
  }
};

export const getDeliveryById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const delivery = await DeliveryService.DeliveryService.getById(id);
    if (delivery) {
      res.json({ data: delivery });
    } else {
      res.status(404).json({ message: "Delivery not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching delivery", error });
  }
};

export const createDelivery = async (req: Request, res: Response) => {
  const deliveryData = req.body;
  try {
    await DeliveryService.DeliveryService.create(deliveryData);
    res.status(201).json({ message: "Delivery created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating delivery", error });
  }
};

export const updateDelivery = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const deliveryData = req.body;
  try {
    await DeliveryService.DeliveryService.update(id, deliveryData);
    res.json({ message: "Delivery updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating delivery", error });
  }
};

export const deleteDelivery = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    await DeliveryService.DeliveryService.delete(id);
    res.json({ message: "Delivery deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting delivery", error });
  }
};
