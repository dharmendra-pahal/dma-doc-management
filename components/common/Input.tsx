"use client";

import { InputProps } from "@/lib/types";

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
