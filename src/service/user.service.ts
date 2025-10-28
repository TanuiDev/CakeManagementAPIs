
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepositories from '../repositories/user.repository';
import { NewUser, UpdateUser } from '../types/user.types';
import { sendEmail } from '../mailer/mailer';
import { emailTemplate } from '../mailer/emailtemplate';

// //  Create user and send verification code
// export const createUser = async (user: NewUser) => {
//   // Hash password
//   if (user.password) {
//     user.password = await bcrypt.hash(user.password, 10);
//   }

//   // Generate 6-digit verification code
//   const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

//   const newUser = { 
//     ...user, 
//     verification_code: verificationCode, 
//     is_verified: false 
//   };

//   // Save user in DB
//   await userRepositories.createUser(newUser);

//   // Send verification email
//   try {
//     await sendEmail(
//       user.email,
//       'Verify your email - CAKEApp By Liz',
//       emailTemplate.verify(user.name, verificationCode)
//     );
//   } catch (error) {
//     console.error('❌ Error sending verification email:', error);
//   }

//   return { message: 'User created successfully. Verification code sent to email.' };
// };

// Login user with role-based JWT
export const loginUser = async (email: string, password: string) => {
  const user = await userRepositories.getUserByEmail(email);
  if (!user) throw new Error('User not found.');

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials.');

  // Ensure user verified email
  if (!user.is_verified) throw new Error('Please verify your email before logging in.');

  // JWT payload including role
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role, // admin, customer, baker
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT secret not defined.');
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });

  return {
    message: 'Login successful.',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};

// Verify user email
export const verifyUser = async (email: string, code: string) => {
  const user = await userRepositories.getUserByEmail(email);
  if (!user) throw new Error('User not found.');

  if (user.verification_code !== code) throw new Error('Invalid verification code.');

  // Mark as verified
  await userRepositories.verifyUser(email);

  try {
    await sendEmail(
      user.email,
      'Your email has been verified - CAKEApp By Liz',
      emailTemplate.verifiedSuccess(user.name)
    );
  } catch (error) {
    console.error('❌ Error sending success email:', error);
  }

  return { message: 'User verified successfully.' };
};

//  Resend verification code
export const resendVerificationCode = async (email: string) => {
  const user = await userRepositories.getUserByEmail(email);
  if (!user) throw new Error('User not found.');

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  await userRepositories.setVerificationCode(email, verificationCode);

  try {
    await sendEmail(
      user.email,
      'Resend verification code - CAKEApp By Liz',
      emailTemplate.verify(user.name, verificationCode)
    );
  } catch (error) {
    console.error('❌ Error resending verification email:', error);
  }

  return { message: 'Verification code resent successfully.' };
};

//  Get all users
export const getAllUsers = async () => {
  return await userRepositories.getUsers();
};

// Get user by ID
export const getUserById = async (id: number) => {
  const user = await userRepositories.getUserById(id);
  if (!user) throw new Error('User not found.');
  return user;
};

// Delete user
export const deleteUser = async (id: number) => {
  return await userRepositories.deleteUser(id);

};


// Get user by email
export const getUserByEmail = async (email: string) => {
  return await userRepositories.getUserByEmail(email);
};


// Create user (admin-level direct creation)
export const createUser = async (user: NewUser) => {
  const existingUser = await userRepositories.getUserByEmail(user.email);
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  return await userRepositories.createUser(user);
};

// Update user
export const updateUser = async (id: number, userUpdates: UpdateUser) => {
  if (userUpdates.password) {
    userUpdates.password = await bcrypt.hash(userUpdates.password, 10);
  }

  return await userRepositories.updateUser(id, userUpdates);
};

// Send verification code
export const sendVerificationCode = async (email: string, code: string) => {
  const user = await userRepositories.getUserByEmail(email);
  if (!user) throw new Error('User not found');

  return await userRepositories.setVerificationCode(email, code);
};


