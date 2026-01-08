import React from "react";

const DashSidebarItem = ({ label, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer"
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};


export default DashSidebarItem;
