"use client";

import { useState } from "react";
import { authService } from "@/lib/api";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import Dropdown from "../common/Dropdown";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authService.signup(email, password, role);
      console.log("signup", res);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Signup failed");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Dropdown
        options={["User", "Admin"]}
        onChange={(selectedValue) => setRole(selectedValue)}
      />
      <Button type="submit">Signup</Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
