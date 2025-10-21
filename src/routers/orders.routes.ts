import * as ordersController from '../Controllers/orders.controler';

const registerOrderRoutes = (app: any) => {
  app.get('/orders', ordersController.getOrders);
};


export default registerOrderRoutes;