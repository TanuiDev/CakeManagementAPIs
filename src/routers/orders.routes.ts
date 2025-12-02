import * as ordersController from "../Controllers/orders.controler";
import {
  adminOnly,
  customerOnly,
  userOnly,
} from "../middlewares/auth.middlewares";

const registerOrderRoutes = (app: any) => {
  app.get("/orders", adminOnly, ordersController.getOrders);
  app.get("/orders/:id", ordersController.getOrderById);
  app.post("/orders", customerOnly, ordersController.createOrder);
  app.patch("/orders/:id", ordersController.updateOrderStatus);
  app.patch("/order/:id", ordersController.updateOrderDetails);
  app.delete("/orders/:id", ordersController.deleteOrder);
  app.get("/user/orders/:userId", ordersController.fetchOrdersofUser);
};

export default registerOrderRoutes;
