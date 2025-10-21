import * as ordersRepository from '../repositories/orders.repository';

export const fetchAllOrders = async () => {
  return await ordersRepository.getAllOrders();
};

export const fetchOrderById = async (orderId: number) => {
  return await ordersRepository.getOrderById(orderId);
};