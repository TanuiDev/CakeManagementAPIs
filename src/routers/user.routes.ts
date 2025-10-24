import express from "express";
import {
  registerUser,
  loginUser,
  listUsers,
  getUser,
  createUserController,
  updateUserController,
  deleteUserController,
  sendVerificationCode,
  verifyUserController,
} from "../Controllers/user.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", listUsers);
router.get("/:id", getUser);
router.post("/", createUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);
router.post("/verify/send", sendVerificationCode);
router.post("/verify", verifyUserController);

export default router;
