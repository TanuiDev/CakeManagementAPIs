import { Express } from "express";
import * as designController from "../Controllers/design.controller";
import { adminOnly } from "../middlewares/auth.middlewares";

export default function registerDesignRoutes(app: any) {
  app.get("/designs", designController.getAllDesigns);
  app.get("/designs/:id", adminOnly, designController.getDesign);
  app.post("/designs",adminOnly, designController.createDesign);
  app.put("/designs/:id", adminOnly, designController.updateDesign);
  app.delete("/designs/:id", adminOnly, designController.deleteDesign);
}
