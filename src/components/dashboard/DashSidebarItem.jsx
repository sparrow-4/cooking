import React from "react";

const DashSidebarItem = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-2 rounded-lg cursor-pointer
      hover:bg-gray-100 transition-colors"
    >
      {label}
    </div>
  );
};

export default DashSidebarItem;
