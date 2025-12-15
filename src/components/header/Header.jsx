import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { FiShoppingCart } from "react-icons/fi";

const Header = ({ toggleCart, isMobile, isTablet }) => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setDateTime(
        now.toLocaleString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateDateTime();
    const t = setInterval(updateDateTime, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* LEFT */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Chef Kitchen
        </h1>
        <p className="text-white mt-1 text-base md:text-xl">{dateTime}</p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <SearchBar placeholder="Search for food, coffee, etc..." />
        </div>

        {/* ✅ TOP CART ICON — DESKTOP ONLY */}
        {!isMobile && !isTablet && (
          <button
            onClick={toggleCart}
            className="p-3 bg-[#2C2A35] rounded-xl hover:bg-[#3a3743] transition"
          >
            <FiShoppingCart size={20} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
