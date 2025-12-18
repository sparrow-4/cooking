import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const SidebarItem = ({ icon, active, onClick }) => {
  const itemRef = useRef(null);
  const iconRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const SLOT_CLASS =
    "relative w-full h-16 flex items-center justify-center overflow-visible";

  const isIconComponent = typeof icon === "function";

  /* ===== GSAP ACTIVE ANIMATION ===== */
  useEffect(() => {
    if (!itemRef.current || !iconRef.current) return;

    if (active) {
      gsap.fromTo(
        itemRef.current,
        { y: -16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        iconRef.current,
        { scale: 0.75 },
        {
          scale: 1,
          duration: 0.4,
          ease: "elastic.out(1, 0.45)",
        }
      );
    }
  }, [active]);

  if (!icon) return null;

  /* ===== ACTIVE ===== */
  if (active) {
    return (
      <div ref={itemRef} className={SLOT_CLASS}>
        {/* TOP CURVE */}
        <div className="absolute -top-8 right-[-35%] w-[18%] h-8 bg-[#1F1D2B] rounded-br-xl rounded-tl-xl z-10" />
        <div className="absolute -top-7 right-[-35%] w-[18%] h-8 bg-[#111018] rounded-tl-xl z-0" />

        {/* MIDDLE RAIL */}
        <div className="absolute inset-y-0 left-[-10%] w-[150%] bg-[#111018] rounded-tl-2xl rounded-bl-2xl z-0" />

        {/* BOTTOM CURVE */}
        <div className="absolute -bottom-8 right-[-35%] w-[18%] h-8 bg-[#1F1D2B] rounded-tr-xl rounded-bl-xl z-10" />
        <div className="absolute -bottom-8 right-[-35%] w-[18%] h-8 bg-[#111018] rounded-bl-xl z-0" />

        {/* ACTIVE BUTTON */}
        <button
          ref={iconRef}
          onClick={onClick}
          className="
            relative z-20
            w-13 h-13
            bg-[#ff9a63]
            rounded-xl
            flex items-center justify-center
            text-white
            shadow-[0_8px_24px_rgba(255,154,99,0.45)]
          "
        >
          {isIconComponent ? (
            React.createElement(icon, { size: 24 })
          ) : (
            <img
              src={icon}
              alt="icon"
              className="w-6 h-6 object-contain"
            />
          )}
        </button>
      </div>
    );
  }

  /* ===== INACTIVE ===== */
  return (
    <div className={SLOT_CLASS}>
      <button
        onClick={onClick}
        className="
          w-11 h-11
          flex items-center justify-center
          rounded-xl
          text-[#F99147]
          hover:text-white
          hover:bg-[#2a2930]
          transition-all duration-200
          hover:scale-110
        "
      >
        {isIconComponent ? (
          React.createElement(icon, { size: 22 })
        ) : (
          <img
            src={icon}
            alt="icon"
            className="w-5 h-5 opacity-70"
          />
        )}
      </button>
    </div>
  );
};

export default SidebarItem;
