import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({ placeholder = "Search dishes…", onSearch }) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);
    onSearch?.(text);
  };

  const clearSearch = () => {
    setValue("");
    onSearch?.("");
  };

  return (
    <motion.div
      layout
      className="relative w-full max-w-xs md:max-w-md"
      initial={false}
      animate={{
        scale: focused ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* SEARCH ICON */}
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-1/2"
        animate={{
          x: focused ? -2 : 0,
          scale: focused ? 1.15 : 1,
          color: focused ? "#fb923c" : "#9ca3af",
        }}
        transition={{ duration: 0.25 }}
      >
        <FiSearch size={18} />
      </motion.div>

      {/* INPUT */}
      <input
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type="text"
        className="
          w-full bg-[#1b1b1b] text-gray-200
          py-3 pl-12 pr-10
          rounded-xl outline-none
          border border-transparent
          focus:border-orange-400
          transition-all duration-300
        "
      />

      {/* FLOATING PLACEHOLDER */}
      <motion.span
        className="absolute left-12 pointer-events-none text-gray-400"
        animate={{
          top: value || focused ? "6px" : "50%",
          fontSize: value || focused ? "11px" : "14px",
          color: focused ? "#fb923c" : "#9ca3af",
          y: value || focused ? 0 : "-50%",
        }}
        transition={{ duration: 0.25 }}
      >
        {placeholder}
      </motion.span>

      {/* CLEAR BUTTON */}
      <AnimatePresence>
        {value && (
          <motion.button
            onClick={clearSearch}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <FiX size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchBar;
