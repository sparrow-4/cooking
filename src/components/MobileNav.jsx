import React from "react";
import {
  FiHome,
  FiBell,
  FiHeart,
  FiMessageSquare,
  FiSettings,
} from "react-icons/fi";
import { motion } from "framer-motion";

const MobileNav = ({ active, setActive }) => {
  const items = [
    { id: "home", icon: FiHome },
    { id: "bell", icon: FiBell },
    { id: "heart", icon: FiHeart },
    { id: "chat", icon: FiMessageSquare },
    { id: "settings", icon: FiSettings },
  ];

  return (
    <div
      className="
        lg:hidden                 /* ✅ hide ONLY on web */
        fixed bottom-0 left-0 right-0
        bg-[#1F1D2B]
        px-6 py-3 pb-[env(safe-area-inset-bottom)]
        flex justify-between items-center
        shadow-[0_-6px_16px_rgba(0,0,0,0.45)]
        z-[60]                    /* above OrderPanel */
      "
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;

        return (
          <motion.button
            key={item.id}
            onClick={() => setActive(item.id)}
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center justify-center w-12 h-12"
          >
            {isActive && (
              <motion.div
                layoutId="mobile-active"
                className="
                  absolute inset-0
                  bg-[#ff9a63]
                  rounded-xl
                  shadow-[0_0_20px_rgba(255,154,99,0.45)]
                "
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}

            <Icon
              size={22}
              className={`relative z-10 ${
                isActive ? "text-black" : "text-gray-400"
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
};

export default MobileNav;
