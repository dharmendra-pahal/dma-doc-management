"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/lib/api"; // using mock authService
import { AuthContextType, UserResponse } from "@/lib/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Load from localStorage if already logged in
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { user, token } = await authService.login(email, password);
    setUser(user);
    setToken(token);
    if (!user || !token) {
      throw new Error("Login failed");
    }
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const signup = async (email: string, password: string, role:string) => {
    const { user, token } = await authService.signup(email, password, role);
    setUser(user);
    setToken(token);
    if (!user || !token) {
      throw new Error("Signup failed");
    }
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
