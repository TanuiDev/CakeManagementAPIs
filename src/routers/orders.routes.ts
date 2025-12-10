import * as ordersController from "../Controllers/orders.controler";
import { adminOnly, Both, customerOnly } from "../middlewares/auth.middlewares";

const registerOrderRoutes = (app: any) => {
  app.get("/orders", Both, ordersController.getOrders);
  app.get("/orders/:id", Both, ordersController.getOrderById);
  app.post("/orders", customerOnly, ordersController.createOrder);
  app.patch("/order/:id", adminOnly, ordersController.updateOrderStatus);
  app.patch("/orders/:id", adminOnly, ordersController.updateOrderDetails);
  app.delete("/orders/:id", adminOnly, ordersController.deleteOrder);
  app.get("/user/orders/:UserId", Both, ordersController.fetchOrdersofUser);
};

export default registerOrderRoutes;
