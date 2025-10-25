import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  loginUserController,         // fixed
  verifyUserController,
  resendVerificationController
} from "../Controllers/user.controller";

const router = express.Router();

// ✅ Routes
router.post("/register", createUserController);
router.post("/login", loginUserController);   // fixed
router.get("/", getAllUsersController);       // fixed
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);
router.post("/verify", verifyUserController);
router.post("/verify/resend", resendVerificationController);

export default router;
