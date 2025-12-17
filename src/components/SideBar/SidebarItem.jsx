import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const SidebarItem = ({ icon: Icon, active, onClick }) => {
  const itemRef = useRef(null);
  const iconRef = useRef(null);

  const SLOT_CLASS =
    "relative w-full h-16 flex items-center justify-center overflow-visible";

  /* ===== GSAP ACTIVE ANIMATION ===== */
  useEffect(() => {
    if (!itemRef.current) return;

    if (active) {
      gsap.fromTo(
        itemRef.current,
        { y: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        iconRef.current,
        { scale: 0.7 },
        {
          scale: 1,
          duration: 0.15,
          ease: "elastic.out(1, 0.5)",
        }
      );
    }
  }, [active]);

  if (!Icon) return null;

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
          className="relative z-20 w-13 h-13 bg-[#ff9a63] rounded-xl flex items-center justify-center"
        >
          <Icon size={22} strokeWidth={2.5} />
        </button>
      </div>
    );
  }

  return (
    <div className={SLOT_CLASS}>
      <button
        onClick={onClick}
        className="
          w-11 h-11
          flex items-center justify-center
          rounded-xl
          text-gray-400
          hover:bg-[#2a2930]
          hover:text-white
          transition-colors duration-200
        "
      >
        <Icon size={22} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default SidebarItem;
