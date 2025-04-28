"use client";

import { ButtonProps } from "@/lib/types";

export function Button({ children, color, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={color ? `${color} "w-full p-2 text-white rounded-lg  transition disabled:bg-gray-400"` : "w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"}
    >
      {children}
    </button>
  );
}
