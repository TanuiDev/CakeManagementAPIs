import { Express } from "express";
import * as cakeController from "../Controllers/readycakes.controller";
import { adminOnly, Both } from "../middlewares/auth.middlewares";

export default function registerCakeRoutes(app: any) {
  app.get("/readycakes", Both, cakeController.getCakes);
  app.get("/readycakes/:id", Both, cakeController.getCake);
  app.post("/readycakes", adminOnly, cakeController.addCake);
  app.put("/readycakes/:id", adminOnly, cakeController.updateCake);
  app.delete("/readycakes/:id", adminOnly, cakeController.deleteCake);
}
