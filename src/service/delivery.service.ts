import * as DeliveryRepository from "../repositories/deliveries.repository";
import { Delivery } from "../types/delivery.types";

export const getAllDelivereries = async () => {
  const deliveries = await DeliveryRepository.getAllDeliveries();
  return deliveries
}

export const getDeliveryById = async (deliveryId: number) => {
   return await DeliveryRepository.getDeliveryById(deliveryId); 
}