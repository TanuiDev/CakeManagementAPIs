import * as ordersRepository from '../repositories/orders.repository';
import { NewOrder } from '../types/orders.types';

export const fetchAllOrders = async () => {
  return await ordersRepository.getAllOrders();
};

export const fetchOrderById = async (orderId: number) => {
  return await ordersRepository.getOrderById(orderId);
};

export const createNewOrder = async (orderData: NewOrder) => {
  return await ordersRepository.createOrder(orderData);
}