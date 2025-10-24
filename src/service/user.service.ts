import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/user.repository';
import { NewUser, User } from '../types/user.types';

export const registerUser = async ({ name, email, password }: NewUser): Promise<User> => {
  const existingUser = await userRepository.getUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser(name, email, hashedPassword);
};

export const listUsers = async (): Promise<User[]> => {
  return await userRepository.getUsers();
};
