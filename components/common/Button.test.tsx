import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {Button} from "./Button";

describe("Button Component", () => {
  it("renders the button with the correct text", () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies additional class names", () => {
    render(
      <Button onClick={() => {}} className="extra-class">
        Click Me
      </Button>
    );
    expect(screen.getByText("Click Me")).toHaveClass("extra-class");
  });
});