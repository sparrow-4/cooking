import React from "react";
import DropdownButton from "../DropdownButton";

const DishFilterBar = () => {
  return (
    <div className="flex items-center justify-between mt-8 pb-2 ">
      
      {/* Left Label */}
      <h2 className="text-lg font-medium text-gray-200">
        Choose Dishes
      </h2>

      {/* Dropdown */}
      <DropdownButton label="Dine In" />
    </div>
  );
};

export default DishFilterBar;
