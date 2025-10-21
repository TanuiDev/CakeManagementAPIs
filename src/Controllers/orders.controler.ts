import * as ordersService from '../service/orders.service'; 

import { Request, Response } from 'express';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await ordersService.fetchAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
