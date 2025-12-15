import React, { useState } from "react";
import {
  FiHome,
  FiBell,
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

const BottomNav = ({ cartCount = 0 }) => {
  const [active, setActive] = useState("home");

  const items = [
    { id: "home", icon: FiHome },
    { id: "bell", icon: FiBell },
    { id: "fav", icon: FiHeart },
    { id: "cart", icon: FiShoppingCart },
    { id: "user", icon: FiUser },
  ];

  return (
    <div
      className="
        fixed bottom-0 left-0 w-full z-[999]
        bg-[#1F1D2B] border-t border-gray-700
        flex justify-around py-3
        md:hidden
      "
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className="relative flex flex-col items-center"
          >
            {/* ICON */}
            <div
              className={`
                p-2 rounded-xl transition-all
                ${isActive ? "bg-[#ff9a63] text-black" : "text-gray-300"}
              `}
            >
              <Icon size={22} />
            </div>

            {/* ACTIVE DOT */}
            {isActive && (
              <span className="w-2 h-2 rounded-full bg-[#ff9a63] mt-1"></span>
            )}

            {/* CART BADGE */}
            {item.id === "cart" && cartCount > 0 && (
              <span
                className="
                  absolute -top-1 -right-2 bg-[#ff4d67]
                  text-white text-[10px] px-1.5 py-0.5 rounded-full
                "
              >
                {cartCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
