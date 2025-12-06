import express from "express";

import { registerDeliveryRoutes } from "./routers/delivery.routes";
import registerOrderRoutes from "./routers/orders.routes";
import registerDesignRoutes from "./routers/design.routes";
import registerUserRoutes from "./routers/user.routes";
import registerCakeRoutes from "./routers/readycakes.routes";
import { registerStageRoutes } from "./routers/stages.routes";
import cors from "cors";

const initializeApp = () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    }),
  );

  app.use(express.json());

  registerOrderRoutes(app);
  registerDesignRoutes(app);
  registerUserRoutes(app);
  registerCakeRoutes(app);
  registerStageRoutes(app);
  registerDeliveryRoutes(app);

  return app;
};

const app = initializeApp();

export default app;
