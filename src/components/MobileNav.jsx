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
  const lastY = useRef(0);
  const hidden = useRef(false);
  const touchStartY = useRef(0);

  const items = [
    { id: "home", icon: FiHome },
    { id: "bell", icon: FiBell },
    { id: "heart", icon: FiHeart },
    { id: "chat", icon: FiMessageSquare },
    { id: "settings", icon: FiSettings },
  ];

  /* ===== ENTRY ===== */
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  /* ===== SCROLL HIDE / SHOW (VELOCITY AWARE) ===== */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (Math.abs(delta) < 8) return;

      // Hide
      if (delta > 0 && !hidden.current) {
        hidden.current = true;
        gsap.to(navRef.current, {
          y: 110,
          opacity: 0,
          duration: Math.min(0.45, Math.abs(delta) / 300),
          ease: "power3.out",
          pointerEvents: "none",
        });
      }

      // Show
      if (delta < 0 && hidden.current) {
        hidden.current = false;
        gsap.to(navRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power3.out",
          pointerEvents: "auto",
        });
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===== KEYBOARD DETECT (HIDE NAV) ===== */
  useEffect(() => {
    const onResize = () => {
      if (window.innerHeight < 500) {
        gsap.to(navRef.current, {
          y: 120,
          opacity: 0,
          duration: 0.3,
          pointerEvents: "none",
        });
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ===== SWIPE UP TO SHOW ===== */
  useEffect(() => {
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      const endY = e.changedTouches[0].clientY;
      if (touchStartY.current - endY > 50 && hidden.current) {
        hidden.current = false;
        gsap.to(navRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          pointerEvents: "auto",
        });
      }
    };

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className="
        lg:hidden
        fixed bottom-0 left-0 right-0
        bg-[#1F1D2B]/90 backdrop-blur-xl
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
            className="relative w-12 h-12 flex items-center justify-center"
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="
                  absolute inset-0
                  bg-gradient-to-br from-[#ff9a63] to-[#ff7a2f]
                  rounded-xl
                  shadow-[0_0_30px_rgba(255,154,99,0.6)]
                "
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              />
            )}

            <Icon
              size={22}
              className={`relative z-10 ${
                isActive ? "text-black" : "text-gray-400"
              }`}
            />

            {isActive && (
              <span className="
                absolute -bottom-1
                w-2 h-2 rounded-full
                bg-[#ff9a63]
                shadow-[0_0_14px_rgba(255,154,99,0.9)]
              " />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default MobileNav;
