"use client";

import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <LoginForm />
      <p>Don't have an Account?</p>
      <Link href={"/auth/signup"}>Signup here</Link>
    </div>
  );
}
