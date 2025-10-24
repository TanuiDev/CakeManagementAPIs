export interface User {
  user_Id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role?: string;
  Created_At?: Date;
  Updated_At?: Date;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role?: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  role?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
