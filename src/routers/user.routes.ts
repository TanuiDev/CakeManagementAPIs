import { Application, application } from "express";
import * as userController from "../Controllers/user.controller";

export default function registerUserRoutes(app: Application) {
 
  app.post("/users/register", userController.createUserController);
  app.post("/users/login", userController.loginUser);
  app.get("/users", userController.getAllUsersController);
  app.get("/users/:id", userController.getUserByIdController);
  app.post("/users", userController.createUserController);
  app.put("/users/:id", userController.updateUserController);
  app.delete("/users/:id", userController.deleteUserController);
  app.post("/users/verify/send", userController.sendVerificationCode);
  app.post("/users/verify", userController.verifyUserController);
}
