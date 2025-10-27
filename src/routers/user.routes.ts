import { Express } from "express";
import * as userController from "../Controllers/user.controller";

export default function registerUserRoutes(app: Express) {
  //  Authentication routes
  app.post("/users/register", userController.registerUser);
  app.post("/users/login", userController.loginUser);

  //  User management routes
  app.get("/users", userController.listUsers);
  app.get("/users/:id", userController.getUser);
  app.post("/users", userController.createUserController);
  app.put("/users/:id", userController.updateUserController);
  app.delete("/users/:id", userController.deleteUserController);

  //  Verification routes
  app.post("/users/verify/send", userController.sendVerificationCode);
  app.post("/users/verify", userController.verifyUserController);
}
