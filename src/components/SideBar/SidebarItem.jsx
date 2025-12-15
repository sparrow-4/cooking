import React from "react";
import { motion } from "framer-motion";

const SidebarItem = ({ icon: Icon, active, onClick }) => {
  if (!Icon) return null;

  const SLOT_CLASS =
    "relative w-full h-16 flex items-center justify-center overflow-visible";

  if (active) {
    return (
      <div className={SLOT_CLASS}>
        {/* TOP CURVE */}
        <div className="absolute -top-8 right-[-35%] w-[18%] h-8 bg-[#1F1D2B] rounded-br-xl rounded-tl-xl z-10" />
        <div className="absolute -top-7 right-[-35%] w-[18%] h-8 bg-[#111018] rounded-tl-xl z-0" />

        {/* MIDDLE RAIL */}
        <div className="absolute inset-y-0 left-[-10%] w-[150%] bg-[#111018] rounded-tl-2xl rounded-bl-2xl z-0" />

        {/* BOTTOM CURVE */}
        <div className="absolute -bottom-8 right-[-35%] w-[18%] h-8 bg-[#1F1D2B] rounded-tr-xl rounded-bl-xl z-10" />
        <div className="absolute -bottom-8 right-[-35%] w-[18%] h-8 bg-[#111018] rounded-bl-xl z-0" />

        {/* ACTIVE BUTTON */}
        <motion.button
          onClick={onClick}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="relative z-20 w-13 h-13 bg-[#ff9a63] rounded-xl flex items-center justify-center"
        >
          <Icon size={22} strokeWidth={2.5} />
        </motion.button>
      </div>
    );
  }

  return (
    <div className={SLOT_CLASS}>
      <button
        onClick={onClick}
        className="w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:bg-[#2a2930] hover:text-white transition"
      >
        <Icon size={22} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default SidebarItem;
