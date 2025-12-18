import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { FiShoppingCart } from "react-icons/fi";

const Header = ({ toggleCart, isMobile, isTablet, totalItems, onSearch }) => {

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
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between  gap-4">
      {/* LEFT */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-white pt-8">
          Chef Kitchen
        </h1>
        <p className="text-white mt-1 text-base md:text-xl">{dateTime}</p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <div className="w-full md:w-auto">
          <SearchBar
  placeholder="Search for food, coffee, etc..."
  onSearch={onSearch}
/>

        </div>

        {/* TOP CART ICON — DESKTOP ONLY */}
        {!isMobile && !isTablet && (
          <button
  onClick={toggleCart}
  className="relative p-3 bg-[#2C2A35] rounded-xl hover:bg-[#3a3743] transition"
>
  <FiShoppingCart size={20} className="text-white" />

  {totalItems > 0 && (
    <span className="
      absolute -top-1 -right-1
      min-w-[18px] h-[18px]
      px-1
      bg-[#ff9a63]
      text-black text-[11px] font-semibold
      rounded-full
      flex items-center justify-center
    ">
      {totalItems}
    </span>
  )}
</button>
  
        )}
      </div>
    </div>
  );
};

export default Header;
