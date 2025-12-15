import React from "react";

const DropdownButton = ({ label }) => {
  return (
    <button
      className="bg-[#1b1b1b] px-4 py-2 rounded-xl flex items-center space-x-2
                 text-gray-200 hover:bg-[#222] transition-all"
    >
      <span>{label}</span>
      <span>▾</span>
    </button>
  );
};

export default DropdownButton;
