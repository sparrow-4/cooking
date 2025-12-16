import React, { useEffect, useRef } from "react";
import {
  FiHome,
  FiBell,
  FiHeart,
  FiMessageSquare,
  FiSettings,
} from "react-icons/fi";
import { motion } from "framer-motion";
import gsap from "gsap";

const MobileNav = ({ active, setActive }) => {
  const navRef = useRef(null);

  const items = [
    { id: "home", icon: FiHome },
    { id: "bell", icon: FiBell },
    { id: "heart", icon: FiHeart },
    { id: "chat", icon: FiMessageSquare },
    { id: "settings", icon: FiSettings },
  ];

  /* ===== GSAP ENTRY ANIMATION ===== */
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div
      ref={navRef}
      className="
        lg:hidden
        fixed bottom-0 left-0 right-0
        bg-[#1F1D2B]/95 backdrop-blur-xl
        px-6 py-3 pb-[env(safe-area-inset-bottom)]
        flex justify-between items-center
        shadow-[0_-8px_30px_rgba(0,0,0,0.55)]
        z-[60]
      "
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;

        return (
          <motion.button
            key={item.id}
            onClick={() => setActive(item.id)}
            whileTap={{ scale: 0.85 }}
            className="relative flex items-center justify-center w-12 h-12"
          >
            {/* ACTIVE LIQUID PILL */}
            {isActive && (
              <motion.div
                layoutId="mobile-active-pill"
                className="
                  absolute inset-0
                  bg-gradient-to-br from-[#ff9a63] to-[#ff7a2f]
                  rounded-xl
                  shadow-[0_0_25px_rgba(255,154,99,0.6)]
                "
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                }}
              />
            )}

            {/* ICON */}
            <motion.div
              animate={{
                y: isActive ? -2 : 0,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative z-10"
            >
              <Icon
                size={22}
                className={
                  isActive
                    ? "text-black"
                    : "text-gray-400 group-hover:text-white"
                }
              />
            </motion.div>

            {/* SUBTLE GLOW RING */}
            {isActive && (
              <span
                className="
                  absolute -bottom-1
                  w-2 h-2
                  rounded-full
                  bg-[#ff9a63]
                  shadow-[0_0_12px_rgba(255,154,99,0.9)]
                "
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default MobileNav;
