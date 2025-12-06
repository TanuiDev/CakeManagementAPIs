import { Router } from "express";
import * as deliveryController from "../Controllers/delivery.controller";

export const registerDeliveryRoutes = (app: any) => {
  app.get("/deliveries", deliveryController.getAllDeliveries);
  app.get("/deliveries/:id", deliveryController.getDeliveryById);
  app.post("/deliveries", deliveryController.createDelivery);
  app.put("/deliveries/:id", deliveryController.updateDelivery);
  app.delete("/deliveries/:id", deliveryController.deleteDelivery);
};
