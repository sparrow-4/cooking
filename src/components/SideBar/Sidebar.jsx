import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../../constants/assets";
import {
  Home,
  Bell,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <aside className="w-[88px] h-screen bg-[#1F1D2B] flex flex-col items-center py-8">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-15 h-15 bg-[#89604c] rounded-xl overflow-hidden flex items-center justify-center">
          <img
            src={assets.logo}
            alt="Store Logo"
            className="w-[70%] h-full object-contain"
          />
        </div>
      </div>

      {/* Main navigation */}
      <div className="flex flex-col items-center gap-4">
        <SidebarItem
          icon={Home}
          active={activePath === "/menu"}
          onClick={() => navigate("/menu")}
        />

        <SidebarItem
          icon={Bell}
          active={activePath === "/menu/notifications"}
          onClick={() => navigate("/menu/notifications")}
        />

        <SidebarItem
          icon={Heart}
          active={activePath === "/menu/favorites"}
          onClick={() => navigate("/menu/favorites")}
        />

        <SidebarItem
          icon={MessageSquare}
          active={activePath === "/menu/messages"}
          onClick={() => navigate("/menu/messages")}
        />

        <SidebarItem
          icon={Settings}
          active={activePath === "/menu/settings"}
          onClick={() => navigate("/menu/settings")}
        />
      </div>

      <div className="flex-grow" />

      {/* Logout */}
      <SidebarItem
        icon={LogOut}
        active={false}
        onClick={() => navigate("/")}
      />
    </aside>
  );
};

export default Sidebar;
