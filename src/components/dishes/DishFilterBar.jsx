import React from "react";
import DropdownButton from "../DropdownButton";

const DishFilterBar = ({ onSearch }) => {
  return (
    <div className="flex items-center justify-between mt-8 pb-2 ">
      
      {/* Left Label */}
      <h2 className="text-lg font-medium font-sans text-gray-200">
        Choose Dishes
      </h2>

      {/* Dropdown */}
      <DropdownButton onSearch={onSearch} />
    </div>
  );
};

export default DishFilterBar;
