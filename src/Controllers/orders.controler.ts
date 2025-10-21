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

export const getOrderById = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id, 10);
  try {
    const order = await ordersService.fetchOrderById(orderId);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await ordersService.createNewOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

