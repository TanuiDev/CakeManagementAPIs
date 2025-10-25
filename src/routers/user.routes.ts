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

router.post("/registerUser", registerUser);
router.post("/login", loginUser);
router.get("/getAllUsers", listUsers);
router.get("/user/:id", getUser);
router.post("/createUser", createUserController);
router.put("/updateUser/:id", updateUserController);
router.delete("user/:id", deleteUserController);
router.post("/verify/send", sendVerificationCode);
router.post("/verify", verifyUserController);

export default router;
