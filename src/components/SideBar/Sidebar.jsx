import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../../constants/assets";
import { SIDEBAR_ITEMS } from "../../constants/sidebar.config";
import SidebarItem from "./SidebarItem";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside className="w-[88px] h-screen bg-secondary flex flex-col items-center py-8">

      {/* LOGO */}
      <div className="mb-8">
        <div className="w-14 h-14 bg-[#89604c] rounded-xl flex items-center justify-center">
          <img
            src={assets.logo}
            alt="Store Logo"
            className="w-[70%] object-contain"
          />
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="flex flex-col items-center gap-4">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            active={pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>

      <div className="flex-grow" />

      {/* LOGOUT */}
      <SidebarItem
        icon={IoLogOutOutline}
        active={false}
        onClick={() => navigate("/")}
      />
    </aside>
  );
};

export default Sidebar;
