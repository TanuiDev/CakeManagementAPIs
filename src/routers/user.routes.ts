import { Application, application } from "express";
import * as userController from "../Controllers/user.controller";
import { adminOnly, userOnly, } from "../middlewares/auth.middlewares";

export default function registerUserRoutes(app: Application) {
<<<<<<< HEAD
 
  app.post("/users/register", adminOnly, userController.createUserController);
=======
  app.post("/users/register", userController.createUserController);
>>>>>>> 31b98b096ac76b33ab7b6f5b800f5d68d860d9aa
  app.post("/users/login", userController.loginUserController);
  app.get("/users", userController.getAllUsersController);
  app.get("/users/:id", userController.getUserByIdController);
  app.put("/users/:id", userController.updateUserRolesController);
  app.delete("/users/:id", userController.deleteUserController);
  app.post("/users/verify", userController.verifyUserController);
  app.post("/users/verify/resend", userController.resendVerificationController);
}
