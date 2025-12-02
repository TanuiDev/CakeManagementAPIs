import * as ordersRepository from "../repositories/orders.repository";
import { NewOrder, updateOrder } from "../types/orders.types";

export const fetchAllOrders = async () => {
  return await ordersRepository.getAllOrders();
};

export const fetchOrderById = async (orderId: number) => {
  return await ordersRepository.getOrderById(orderId);
};

export const createNewOrder = async (orderData: NewOrder) => {
  return await ordersRepository.createOrder(orderData);
};

export const changeOrderStatus = async (orderId: number, status: string) => {
  const order = await ordersRepository.getOrderById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  return await ordersRepository.updateOrderStatus(orderId, status);
};
export const modifyOrderDetails = async (
  orderId: number,
  orderData: Partial<updateOrder>,
) => {
  const order = await ordersRepository.getOrderById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  return await ordersRepository.updateOrderDetails(orderId, orderData);
};

export const removeOrder = async (orderId: number) => {
  const order = await ordersRepository.getOrderById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  return await ordersRepository.deleteOrder(orderId);
};

export const fetchOrdersofUser = async (UserId: number) => {

  const result = await ordersRepository.fetchOrdersofUser(UserId);

  if (!result) {
    throw new Error("User not found or has no orders");
  }

  return result;
};
