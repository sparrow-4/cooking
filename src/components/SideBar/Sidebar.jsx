import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Bell,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
  Store,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const navigate = useNavigate();

  return (
    <aside className="w-[88px] h-screen bg-[#1F1D2B] flex flex-col items-center py-8">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-[#be5821] rounded-xl flex items-center justify-center text-white">
          <Store size={30} strokeWidth={2.5} />
        </div>
      </div>

      {/* Main navigation */}
      <div className="flex flex-col items-center gap-4">
        <SidebarItem
          icon={Home}
          active={activeItem === "home"}
          onClick={() => {
            setActiveItem("home");
            navigate("#");
          }}
        />
        <SidebarItem
          icon={Bell}
          active={activeItem === "bell"}
          onClick={() => setActiveItem("bell")}
        />
        <SidebarItem
          icon={Heart}
          active={activeItem === "heart"}
          onClick={() => setActiveItem("heart")}
        />
        <SidebarItem
          icon={MessageSquare}
          active={activeItem === "chat"}
          onClick={() => setActiveItem("chat")}
        />
        <SidebarItem
          icon={Settings}
          active={activeItem === "settings"}
          onClick={() => setActiveItem("settings")}
        />
      </div>

      <div className="flex-grow" />

      {/* Logout */}
      <SidebarItem
        icon={LogOut}
        active={false}
        onClick={() => {
          setActiveItem("home");
          navigate("/");
        }}
      />
    </aside>
  );
};

export default Sidebar;
