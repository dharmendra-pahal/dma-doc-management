import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "./Dropdown";

describe("Dropdown Component", () => {
  const options = ["Option 1", "Option 2", "Option 3"];
  const onChangeMock = jest.fn();

  it("renders the dropdown with the correct options", () => {
    render(<Dropdown options={options} selected={"Option 1"} onChange={onChangeMock} />);
    expect(screen.getByDisplayValue("Option 1")).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("calls the onChange handler when a new option is selected", () => {
    render(<Dropdown options={options} selected={"Option 1"} onChange={onChangeMock} />);
    fireEvent.change(screen.getByDisplayValue("Option 1"), {
      target: { value: "Option 2" },
    });
    expect(onChangeMock).toHaveBeenCalledWith("Option 2");
  });

  it("displays the correct selected value", () => {
    render(<Dropdown options={options} selected={"Option 3"} onChange={onChangeMock} />);
    expect(screen.getByDisplayValue("Option 3")).toBeInTheDocument();
  });
});