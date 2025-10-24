import { Request, Response } from "express";
import {
  createUser,
  getUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
  setVerificationCode,
  verifyUser,
} from "../repositories/user.repository";
import { NewUser, UpdateUser, LoginUser } from "../types/user.types";
import bcrypt from "bcrypt";

// ✅ Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const newUser: NewUser = req.body;

  try {
    const existingUser = await getUserByEmail(newUser.email);
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    const result = await createUser(newUser);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ List all users
export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single user by ID
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getUserById(Number(id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Login user
export const loginUser = async (req: Request, res: Response) => {
  const loginData: LoginUser = req.body;
  const { email, password } = loginData;

  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create user (admin-level direct creation)
export const createUserController = async (req: Request, res: Response) => {
  const newUser: NewUser = req.body;

  try {
    const existingUser = await getUserByEmail(newUser.email);
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    const result = await createUser(newUser);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update user
export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userUpdates: UpdateUser = req.body;

  try {
    if (userUpdates.password) {
      userUpdates.password = await bcrypt.hash(userUpdates.password, 10);
    }

    const result = await updateUser(Number(id), userUpdates);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete user
export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await deleteUser(Number(id));
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Send verification code
export const sendVerificationCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const result = await setVerificationCode(email, code);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Verify user
export const verifyUserController = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const result = await verifyUser(email);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
