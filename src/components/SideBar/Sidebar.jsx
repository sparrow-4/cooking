import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "../../constants/assets";
import SidebarItem from "./SidebarItem";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside className="w-[88px] h-screen bg-[#1F1D2B] flex flex-col items-center py-8">

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
            <SidebarItem
                icon={assets.icons.home}
                active={pathname === "/menu"}
                onClick={() => navigate("/menu")}
              />

        <SidebarItem
          icon={assets.icons.settings}
          active={pathname === "/menu/notifications"}
          onClick={() => navigate("/menu/notifications")}
        />

        <SidebarItem
          icon={assets.icons.favorites}
          active={pathname === "/menu/favorites"}
          onClick={() => navigate("/menu/favorites")}
        />

        <SidebarItem
          icon={assets.icons.messages}
          active={pathname === "/menu/messages"}
          onClick={() => navigate("/menu/messages")}
        />

        <SidebarItem
          icon={assets.icons.bell}
          active={pathname === "/menu/settings"}
          onClick={() => navigate("/menu/settings")}
        />
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
