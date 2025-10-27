
<<<<<<< HEAD
export const createUserController = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
=======
import { Request, Response } from "express";
import * as userService from "../service/user.service";
import { NewUser, UpdateUser, LoginUser } from "../types/user.types";


>>>>>>> 63b0813452d580a6fedc85d5e8d091ecf76f9201


export const getAllUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


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

  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
<<<<<<< HEAD
export const updateUserController = async (req: Request, res: Response) => {
=======

// ✅ Update user (admins can update any, users update own)
export const updateUserRolesController = async (req: Request, res: Response) => {
>>>>>>> 63b0813452d580a6fedc85d5e8d091ecf76f9201
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

<<<<<<< HEAD
// Delete user (admin only)
export const deleteUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
=======
// Login user
export const loginUser = async (req: Request, res: Response) => {
  const {email, password} = req.body;

>>>>>>> 63b0813452d580a6fedc85d5e8d091ecf76f9201
  try {
    const result = await userService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

<<<<<<< HEAD
// Login user
=======
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
export const updateUserController = async(req: Request, res: Response) => {
  const { id } = req.params;
  const userUpdates: UpdateUser = req.body;


    try {
      const result = await userService.updateUser(Number(id), userUpdates);
      res.status(200).json(result.message)

    } catch (error:any) {
    res.status(500).json({ message: error.message });
      
    }

}

// ✅ Login user
>>>>>>> 63b0813452d580a6fedc85d5e8d091ecf76f9201
export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await userService.loginUser(email, password);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

<<<<<<< HEAD
// Verify user email
=======
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

>>>>>>> 63b0813452d580a6fedc85d5e8d091ecf76f9201
export const verifyUserController = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  try {
    const result = await userService.verifyUser(email, code);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Resend verification code
export const resendVerificationController = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const result = await userService.resendVerificationCode(email);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};