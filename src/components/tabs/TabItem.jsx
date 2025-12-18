import React from "react";

const TabItem = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        pb-1 text-sm font-medium
        transition-all duration-300
        border-b-2
        ${
          active
            ? "text-orange-400 border-orange-400"
            : "text-white border-transparent hover:text-orange-400 hover:border-orange-400"
        }
      `}
    >
      {label}
    </button>
  );
};

export default TabItem;
