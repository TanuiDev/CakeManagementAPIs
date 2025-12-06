import { Router } from "express";
import * as deliveryController from "../Controllers/delivery.controller";

export const registerDeliveryRoutes = (app: any) => {
  app.get("/deliveries", deliveryController.getAllDeliveries);
  app.get("/deliveries/:id", deliveryController.getDeliveryById);

};
