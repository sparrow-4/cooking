// import React, { useState } from "react";
// import { FiBell, FiMenu } from "react-icons/fi";
// import { CiSettings } from "react-icons/ci";
// import profileImg from "../../assets/images/pro.jpg";
// import SidebarItem from "./SidebarItem";

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="flex h-screen bg-gray-100 overflow-hidden">

//       {/* ===== MOBILE BACKDROP ===== */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 z-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* ===== SIDEBAR ===== */}
//       <aside
//         className={`
//           fixed md:static inset-y-0 left-0 z-50
//           w-64 bg-white border-r border-gray-200 shadow-md md:shadow-none
//           transform transition-transform duration-300
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0
//         `}
//       >
//         {/* Sidebar Header */}
//         <div className="h-16 flex items-center justify-between px-6 font-bold text-xl text-primary border-b">
//           Chef Kitchen
//           <button
//             className="md:hidden text-xl"
//             onClick={() => setSidebarOpen(false)}
//           >
//             ✕
//           </button>
//         </div>

//         {/* Sidebar Menu */}
//         <nav className="px-4 py-4 space-y-2 text-gray-600">
//           <SidebarItem label="Category" onClick={() => setSidebarOpen(false)} />
//           <SidebarItem label="Products" onClick={() => setSidebarOpen(false)} />
//           <SidebarItem label="Orders" onClick={() => setSidebarOpen(false)} />
//         </nav>
//       </aside>

//       {/* ===== MAIN AREA ===== */}
//       <div className="flex-1 flex flex-col">

//         {/* ===== TOP NAVBAR ===== */}
//         <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">

//           {/* LEFT */}
//           <div className="flex items-center gap-3">
//             <FiMenu
//               className="md:hidden text-xl cursor-pointer"
//               onClick={() => setSidebarOpen(true)}
//             />
//             <h1 className="text-sm font-semibold text-gray-600 tracking-wide">
//               Dashboard Page
//             </h1>
//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center gap-6">

//             {/* Notification */}
//             <div className="relative cursor-pointer">
//               <FiBell className="text-xl text-gray-600" />
//               <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px]
//                 w-5 h-5 rounded-full flex items-center justify-center">
//                 13
//               </span>
//             </div>

//             {/* User */}
//             <div className="flex items-center gap-3">
//               <img
//                 src={profileImg}
//                 alt="Admin"
//                 className="w-8 h-8 rounded-full object-cover"
//               />
//               <div className="text-xs leading-tight">
//                 <p className="font-semibold text-gray-700">Admin</p>
//                 <p className="text-gray-400">Editor</p>
//               </div>
//             </div>

//             {/* Settings */}
//             <CiSettings className="text-xl text-gray-600 cursor-pointer" />
//           </div>
//         </header>

//         {/* ===== PAGE CONTENT ===== */}
//         <main className="flex-1 p-6">
//           {/* Your content here */}
//         </main>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import DashSidebarItem from "./DashSidebarItem";
import { FiBell, FiMenu } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";

import { set } from "date-fns";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [sidebaropen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-secondary overflow-hidden">
      {/* mobile */}

      {sidebaropen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* sidebar */}
      <aside
        className={`fixed inset-y-0 flex flex-col z-50 w-60 shadow-2xl shadow-[#875c2c] bg-primary  md:shadow-non 
        transform transition-transform duration-400 ${
          sidebaropen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0
        
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 font-semibold font-sans text-xl text-white">
          {" "}
          Chef Kitchen
          <button
            className="text-xl md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="px-4 flex-1 px-4 space-y-2 text-blak">
          <DashSidebarItem
            label={"category"}
            onClick={() => setSidebarOpen(false)}
          />
          <DashSidebarItem
            label={"products"}
            onClick={() => setSidebarOpen(false)}
          />
          <DashSidebarItem
            label={"orders"}
            onClick={() => setSidebarOpen(false)}
          />
        </nav>

        <div className="p-4 border-t border-white">
          <button
            className="flex items-center gap-2 text-white text-lg hover:text-red-400"
            onClick={() => {
              navigate("/");
              setSidebarOpen(false);
            }}
          >
            <CiLogout />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      {/* ===== MAIN AREA ===== */}

      <div className="">
        {/* ===== TOP NAVBAR ===== */}
        <header className="h-16 bg-white top-0 sticky flex justify-between items-center px-4 z-30">
          {/* left */}
          <div className=" flex items-center gap-3">
            <FiMenu
              className="md:hidden text-xl cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            />
            <h1 className="text-xl text-black font-bold tracking-wide">
              Dashboard Page
            </h1>
          </div>

          {/* right */}
          <div className="">
            <div className="relative cursor-pointer">
              <FiBell className="text-2xl text-black" />
              <span
                className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px]
                w-5 h-5 rounded-full flex items-center justify-center"
              >
                
                10
              </span>
            </div>
            {/* user */}
            <div className="">

            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Dashboard;
