import * as ordersController from '../Controllers/orders.controler';

const registerOrderRoutes = (app: any) => {
  app.get('/orders', ordersController.getOrders);
  app.get('/orders/:id', ordersController.getOrderById);
  app.post('/orders', ordersController.createOrder);
  app.patch('/orders/:id', ordersController.updateOrderStatus);
};


export default registerOrderRoutes;