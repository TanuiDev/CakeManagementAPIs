import { Request, Response } from "express";

import * as DeliveryService from "../service/delivery.service";
import { error } from "console";

export const getAllDeliveries = async (req: Request, res: Response) => {
  try {
    const deliveries = await DeliveryService.getAllDelivereries();
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching deliveries", error });
  }
};

export const getDeliveryById = async (req: Request, res: Response) => {
  const deliveryId = parseInt(req.params.id);
  try {
    const delivery = await DeliveryService.getDeliveryById(deliveryId);
    if(!delivery){
      return res.status(404).json({message:"Delivery not found"})
    }else{
         res.status(200).json({data:delivery})
    }     
  } catch (error:any) {   
    res.status(500).json({message:"Internal server error",error})
  }
};
