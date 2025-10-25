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

export default router;
