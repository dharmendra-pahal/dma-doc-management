"use client";
import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Button } from "./Button";

const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Document Management App</div>
      <div>
        {user ? (
          <Button
            onClick={logout}
            color="bg-red-500 hover:bg-red-600"
          >
            Logout
          </Button>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
