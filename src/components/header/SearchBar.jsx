import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ placeholder }) => {
  return (
    <div className="relative w-full max-w-xs md:max-w-md">
      {/* Search Icon */}
      <FiSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />

      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        className="
          w-full bg-[#1b1b1b] text-gray-300
          py-2.5 md:py-3
          pl-12 pr-4 rounded-xl
          outline-none
          focus:ring-2 focus:ring-orange-400
          transition-all
          text-sm md:text-base
        "
      />
    </div>
  );
};

export default SearchBar;
