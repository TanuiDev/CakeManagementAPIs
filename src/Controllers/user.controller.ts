import { Request, Response } from 'express';
import * as userService from '../service/user.service';

// ✅ Create / Register user
export const createUserController = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get all users
export const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers(); // Make sure to add getAllUsers in service
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get user by ID
export const getUserByIdController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const user = await userService.getUserById(id); // Make sure to add getUserById in service
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update user
export const updateUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await userService.updateUser(id, req.body); // Add updateUser in service
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete user
export const deleteUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const result = await userService.deleteUser(id); // Add deleteUser in service
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Login user
export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await userService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

// ✅ Verify user email
export const verifyUserController = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  try {
    const result = await userService.verifyUser(email, code);
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
