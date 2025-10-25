export interface User {
  user_Id: number;
  id?: number; 
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role?: string;
  Created_At?: Date;
  Updated_At?: Date;
   verification_code?: string | null;
  is_verified?: boolean;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role?: string;
  is_verified?: boolean;
  verification_code?: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  role?: string;
   is_verified?: boolean;
  verification_code?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
