import { Request, Response } from "express";
import * as userService from "../service/user.service";
import { NewUser, UpdateUser, LoginUser } from "../types/user.types";

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const newUser: NewUser = req.body;

  try {
    const result = await userService.registerUser(newUser);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// List all users
export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user by ID
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(Number(id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

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
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

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
export const verifyUserController = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const result = await userService.verifyUser(email);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
