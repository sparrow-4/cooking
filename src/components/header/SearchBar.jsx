import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ placeholder, onSearch }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);
    onSearch?.(text); // send data to parent
  };

  return (
    <div className="relative w-full max-w-xs md:max-w-md">
      {/* Icon */}
      <FiSearch
        className={`
          absolute left-4 top-1/2 -translate-y-1/2
          transition-all duration-300
          ${value ? "text-primary scale-110" : "text-gray-400"}
        `}
        size={18}
      />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full bg-[#1b1b1b] text-gray-300
          py-2.5 md:py-3
          pl-12 pr-4 rounded-xl
          outline-none
          focus:ring-2 focus:ring-orange-400
          transition-all duration-300
          focus:scale-[1.02]
          text-sm md:text-base
        "
      />
    </div>
  );
};

export default SearchBar;
