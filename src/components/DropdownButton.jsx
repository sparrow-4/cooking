import React, { useState } from "react";

const OrderTypeButton = () => {
  const [type, setType] = useState("DINE_IN");

  const isDineIn = type === "DINE_IN";

  const toggleType = () => {
    setType(prev => (prev === "DINE_IN" ? "TAKE_AWAY" : "DINE_IN"));
  };

  return (
    <button
      onClick={toggleType}
      className={`
        relative px-5 py-2 rounded-xl flex items-center gap-2
        font-medium transition-all duration-300
        active:scale-95
        ${
          isDineIn
            ? "bg-emerald-600 text-white hover:bg-emerald-700"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }
      `}
    >
      <span className="transition-all duration-300">
        {isDineIn ? "Dine In" : "Take Away"}
      </span>

      <span
        className={`
          transition-transform duration-300
          ${isDineIn ? "rotate-0" : "rotate-180"}
        `}
      >
        🍽️
      </span>
    </button>
  );
};

export default OrderTypeButton;
