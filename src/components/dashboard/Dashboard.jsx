import React, { useState } from "react";
import { FiBell, FiMenu } from "react-icons/fi";
import { CiLogout, CiSettings } from "react-icons/ci";
import profileImg from "../../assets/images/pro.png";
import DashSidebarItem from "./DashSidebarItem";
import { useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { MdCategory } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    { label: "Category", icon: MdCategory, path: "/dashboard/category" },
    { label: "Products", icon: BsBoxSeam, path: "/dashboard/products" },
    { label: "Orders", icon: TiShoppingCart, path: "/dashboard/orders" },
  ];
  const [settingsopen, setSettingsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full max-w-[1600px] mx-auto bg-gray-100 overflow-hidden">
      {/* ===== MOBILE BACKDROP ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR mobl ===== */}
      <aside
        className={`
          
              hidden md:flex
              md:static inset-y-0 left-0 z-50
              w-64 bg-[#141521] 
              flex-col
            
          
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 font-bold text-3xl text-primary border-b border-gray-600 ">
          Chef Kitchen
          
        </div>

        <nav className="px-4 py-4 space-y-2 text-white">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <DashSidebarItem
                key={index}
                label={item.label}
                icon={<Icon size={20} />}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
              />
            );
          })}
        </nav>


        
      </aside>

      {/* ===== MAIN AREA ===== */}
      <div className="flex-1 flex flex-col">
        {/* ===== TOP NAVBAR ===== */}
        <header className="h-16 bg-[#11121a] border-b  flex items-center justify-between px-6 sticky top-0 z-30">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            
            <h1 className="text-lg font-semibold text-white font-sans tracking-wide">
              Dashboard Page
            </h1>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6">
            {/* Notification */}
            <div
              className="
                relative cursor-pointer rounded-full
                p-2
                transition
                hover:bg-primary/30
                active:scale-95
              "
              onClick={() => console.log("Notification clicked")}
            >
              <FiBell className="text-xl text-gray-600" />

              <span
                className="
                  absolute -top-1 -right-1
                  bg-primary text-white text-[10px]
                  w-5 h-5 rounded-full
                  flex items-center justify-center
                "
              >
                13
              </span>
            </div>

            {/* User */}
            <div className="flex items-center gap-3   ">
              <img
                src={profileImg}
                alt="Admin"
                className=" w-8 h-8 rounded-full object-cover
    cursor-pointer
    transition
    hover:ring-2 hover:ring-primary
    active:scale-95"
              />
              <div className="text-xs leading-tight">
                <p className="font-bold text-primary">Admin</p>
                <p className="text-white">Editor</p>
              </div>
            </div>

            {/* Settings */}
            <CiSettings
              className="text-xl text-gray-600 cursor-pointer hidden md:block"
              onClick={() => setSettingsOpen(true)}
            />
          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className="flex-1 p-6 pb-20 md:pb-6 overflow-y-auto bg-secondary">
          <Outlet />
        </main>

        {/* ===== SETTINGS BACKDROP ===== */}
        {settingsopen && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setSettingsOpen(false)}
          />
        )}

        {/* ===== SETTINGS SIDEBAR (RIGHT) ===== */}
        <aside
          className={`
    fixed inset-y-0 right-0 z-50
    w-72 bg-secondary shadow-lg
    transform transition-transform duration-300 ease-in-out
    ${settingsopen ? "translate-y-0" : "translate-y-full"}
  `}
        >
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-600 text-primary">
            <span className="font-semibold">Settings</span>
            <button className="text-xl" onClick={() => setSettingsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="p-4 text-white"></div>
          
          <button
            className="flex items-center justify-center fixed bottom-15 left-1/6  gap-2 bg-primary w-50 h-10 rounded-3xl  text-white text-lg hover:text-red-400"
            onClick={() => {
              navigate("/");
              setSidebarOpen(false);
            }}
          >
            <CiLogout  />
            <span>Logout</span>
          </button>
        
        </aside>
        
        {/* ===== MOBILE BOTTOM NAV ===== */}
<nav className="
  fixed bottom-0 left-0 right-0 z-50
  bg-secondary border-t border-gray-700
  flex justify-around items-center
  py-2
  md:hidden
">
  {menuItems.map((item, index) => {
    const Icon = item.icon;
    return (
      <button
        key={index}
        onClick={() => navigate(item.path)}
        className="flex flex-col items-center text-white text-xs"
      >
        <Icon size={22} />
        <span>{item.label}</span>
      </button>
    );
  })}

  {/* Settings */}
  <button
    onClick={() => setSettingsOpen(true)}
    className="flex flex-col items-center text-white text-xs"
  >
    <CiSettings size={22} />
    <span>Settings</span>
  </button>
</nav>

      </div>
    </div>
  );
};

export default Dashboard;
