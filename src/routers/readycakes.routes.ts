import { Express } from "express";
import * as cakeController from "../Controllers/readycakes.controller";
import { adminOnly, Both } from "../middlewares/auth.middlewares";

export default function registerCakeRoutes(app: any) {
  app.get("/readycakes", cakeController.getCakes);
  app.get("/readycakes/:id", cakeController.getCake);
  app.post("/readycakes", cakeController.addCake);
  app.put("/readycakes/:id", cakeController.updateCake);
  app.delete("/readycakes/:id", cakeController.deleteCake);
}
