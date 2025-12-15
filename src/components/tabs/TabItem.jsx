import React from "react";

const TabItem = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`pb-1 transition-all text-sm font-medium 
        ${active ? "text-orange-400 border-b-2 border-orange-400" : "text-gray-400 hover:text-white"}
      `}
    >
      {label}
    </button>
  );
};

export default TabItem;
