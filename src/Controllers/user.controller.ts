<<<<<<< HEAD
import { Request, Response } from "express";
import * as userService from "../service/user.service";
import { NewUser, UpdateUser, LoginUser } from "../types/user.types";

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const newUser: NewUser = req.body;
=======
import { Request, Response } from 'express';
import * as userService from '../service/user.service';
>>>>>>> 9850407e22e4af014f4753ec87a154eef973e492

// ✅ Create / Register user
export const createUserController = async (req: Request, res: Response) => {
  try {
<<<<<<< HEAD
    const result = await userService.registerUser(newUser);
=======
    const result = await userService.createUser(req.body);
>>>>>>> 9850407e22e4af014f4753ec87a154eef973e492
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

<<<<<<< HEAD
// List all users
export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
=======
// ✅ Get all users (admin only)
export const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
>>>>>>> 9850407e22e4af014f4753ec87a154eef973e492
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

<<<<<<< HEAD
// Get single user by ID
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(Number(id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
=======
// ✅ Get user by ID (admins can fetch any, user fetches own)
export const getUserByIdController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const requestingUser = (req as any).user;

    // Non-admins can only fetch their own data
    if (requestingUser.role !== 'admin' && requestingUser.id !== id) {
      return res.status(403).json({ message: "Forbidden: Cannot access other user's data" });
    }

    const user = await userService.getUserById(id);
    res.status(200).json(user);
>>>>>>> 9850407e22e4af014f4753ec87a154eef973e492
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// ✅ Update user (admins can update any, users update own)
export const updateUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const requestingUser = (req as any).user;

    if (requestingUser.role !== 'admin' && requestingUser.id !== id) {
      return res.status(403).json({ message: "Forbidden: Cannot update other user's data" });
    }

    const result = await userService.updateUser(id, req.body);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete user (admin only)
export const deleteUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await userService.deleteUser(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

<<<<<<< HEAD
// Login user
export const loginUser = async (req: Request, res: Response) => {
  const loginData: LoginUser = req.body;

  try {
    const result = await userService.loginUser(loginData);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Create user (admin-level)
export const createUserController = async (req: Request, res: Response) => {
  const newUser: NewUser = req.body;

  try {
    const result = await userService.createUser(newUser);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userUpdates: UpdateUser = req.body;

  try {
    const result = await userService.updateUser(Number(id), userUpdates);
=======
// ✅ Login user
export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await userService.loginUser(email, password);
>>>>>>> 9850407e22e4af014f4753ec87a154eef973e492
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

<<<<<<< HEAD
// Delete user
export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userService.deleteUser(Number(id));
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Send verification code
export const sendVerificationCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    const result = await userService.sendVerificationCode(email, code);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Verify user
=======
// ✅ Verify user email
>>>>>>> 9850407e22e4af014f4753ec87a154eef973e492
export const verifyUserController = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  try {
<<<<<<< HEAD
    const result = await userService.verifyUser(email);
=======
    const result = await userService.verifyUser(email, code);
>>>>>>> 9850407e22e4af014f4753ec87a154eef973e492
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Resend verification code
export const resendVerificationController = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const result = await userService.resendVerificationCode(email);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
