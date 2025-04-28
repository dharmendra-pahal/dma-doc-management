
import { ButtonHTMLAttributes } from "react";
import { InputHTMLAttributes } from "react";


export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {label?: string;}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {label?: string;}

export interface DropdownProps {
  options: string[];
  onChange: (selectedValue: string) => void;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}

export type UserResponse = Omit<User, 'password'>;

export interface AuthContextType {
  user: UserResponse | undefined;
  token: string | undefined;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role:string) => Promise<void>;
  logout: () => void;
}
