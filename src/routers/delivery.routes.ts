import { Router } from "express";
import * as deliveryController from "../Controllers/delivery.controller";

export const registerDeliveryRoutes = (app: any) => {
  app.post("/deliveries", deliveryController.scheduleDelivery);
  app.get("/deliveries", deliveryController.getAllDeliveries);
  app.get("/deliveries/:id", deliveryController.getDeliveryById);
  app.put("/deliveries/:id", deliveryController.updateDelivery);
  app.delete("/deliveries/:id", deliveryController.deleteDelivery);
};
