import * as ordersController from "../Controllers/orders.controler";
import {
  adminOnly,
  customerOnly,
  userOnly,
} from "../middlewares/auth.middlewares";

const registerOrderRoutes = (app: any) => {
  app.get("/orders", ordersController.getOrders);
  app.get("/orders/:id", ordersController.getOrderById);
  app.post("/orders",  ordersController.createOrder);
  app.patch("/order/:id",  ordersController.updateOrderStatus);
  app.patch("/orders/:id", ordersController.updateOrderDetails);
  app.delete("/orders/:id",  ordersController.deleteOrder);
  app.get("/user/orders/:UserId", ordersController.fetchOrdersofUser);
};

export default registerOrderRoutes;
