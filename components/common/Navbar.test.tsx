import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";
import { AuthProvider } from "@/contexts/AuthContext";

describe("Navbar Component", () => {
  const mockLogout = jest.fn();

  const renderNavbar = () => {
    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );
  };

  it("renders the app name", () => {
    renderNavbar();
    expect(screen.getByText("Document Management App")).toBeInTheDocument();
  });

  it("calls the logout function when the logout button is clicked", () => {
    renderNavbar();
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});