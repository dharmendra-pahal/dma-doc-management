import React from "react";
import { DropdownProps } from "@/lib/types";

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  return (
    <select
      className="border border-gray-300 w-full rounded-md p-2 bg-white shadow-sm focus:ring focus:ring-blue-200"
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
