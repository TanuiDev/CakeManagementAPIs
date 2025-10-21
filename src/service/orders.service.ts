import * as ordersRepository from '../repositories/orders.repository';

export const fetchAllOrders = async () => {
  return await ordersRepository.getAllOrders();
};