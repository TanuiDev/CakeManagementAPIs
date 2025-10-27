<<<<<<< HEAD
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
=======
import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  loginUserController,
  verifyUserController,
  resendVerificationController
} from "../Controllers/user.controller";

import { adminOnly, userOnly, adminUser } from "../middlewares/auth.middlewares";

const router = express.Router();

// Public routes
router.post("/register", createUserController);
router.post("/login", loginUserController);
router.post("/verify", verifyUserController);
router.post("/verify/resend", resendVerificationController);

// Protected routes
router.get("/", adminOnly, getAllUsersController);             // Only admins can fetch all users
router.get("/:id", adminUser, getUserByIdController);          // Admins can fetch any, users fetch own
router.put("/:id", adminUser, updateUserController);           // Admins update any, users update own
router.delete("/:id", adminOnly, deleteUserController);        // Only admins can delete
>>>>>>> 9850407e22e4af014f4753ec87a154eef973e492

  //  Verification routes
  app.post("/users/verify/send", userController.sendVerificationCode);
  app.post("/users/verify", userController.verifyUserController);
}
