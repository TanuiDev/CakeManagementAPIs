import bcrypt from 'bcryptjs';
import * as userRepository from '../repositories/user.repository';
import { NewUser, UpdateUser, LoginUser, User } from '../types/user.types';

// Register a new user
export const registerUser = async (user: NewUser) => {
  const existingUser = await userRepository.getUserByEmail(user.email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  await userRepository.createUser(user);

  return { message: 'User created successfully. Verification code sent to email' };
};

// List all users
export const listUsers = async (): Promise<User[]> => {
  return await userRepository.getUsers();
};

// Get user by ID
export const getUserById = async (id: number): Promise<User | null> => {
  return await userRepository.getUserById(id);
};

// Get user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await userRepository.getUserByEmail(email);
};

// Login user
export const loginUser = async (loginData: LoginUser) => {
  const user = await userRepository.getUserByEmail(loginData.email);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(loginData.password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return { message: 'Login successful', user };
};

// Create user (admin-level direct creation)
export const createUser = async (user: NewUser) => {
  const existingUser = await userRepository.getUserByEmail(user.email);
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  return await userRepository.createUser(user);
};

// Update user
export const updateUser = async (id: number, userUpdates: UpdateUser) => {
  if (userUpdates.password) {
    userUpdates.password = await bcrypt.hash(userUpdates.password, 10);
  }

  return await userRepository.updateUser(id, userUpdates);
};

// Delete user
export const deleteUser = async (id: number) => {
  return await userRepository.deleteUser(id);
};

// Send verification code
export const sendVerificationCode = async (email: string, code: string) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) throw new Error('User not found');

  return await userRepository.setVerificationCode(email, code);
};

// Verify user
export const verifyUser = async (email: string) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) throw new Error('User not found');

  return await userRepository.verifyUser(email);
};
