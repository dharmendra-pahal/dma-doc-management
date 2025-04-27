// /lib/api.ts

import { v4 as uuidv4 } from "uuid";
import { User, UserResponse } from "./types";



const mockUsers: User[] = [
  {
    id: 'someid',
    email: "test@example.com",
    password: "password",
    role: "user",
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const authService = {
  login: async (email: string, password: string): Promise<{ user?: UserResponse; token?: string; success:boolean; message?:string }> => {
    await delay(500); // Simulate network delay
    const user = mockUsers.find((u) => u.email === email && u.password === password);

    if (user) {
      return { user, token: uuidv4(), success:true }; 
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  },

  signup: async (email: string, password: string, role:string): Promise<{ user?: User; token?: string; success?:boolean; message?:string }> => {
    await delay(500);
    const existingUser = mockUsers.find((u) => u.email === email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    mockUsers.push({ email, password, id: uuidv4(), role });

    console.log("mockusers", mockUsers);
    

    return { success: true, message: 'Account created successfully.' };
  }

}