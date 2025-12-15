import React, { useState } from "react";

const OrderTypeSelector = () => {
  const [selected, setSelected] = useState("Dine In");

  const types = ["Dine In", "Take Away", "Delivery"];

  return (
    <div className="flex space-x-2 mt-4">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => setSelected(type)}
          className={`px-4 py-2 rounded-lg text-sm transition-all
            ${selected === type ? "bg-orange-500 text-white" : "bg-[#1d1d1d] text-gray-300 hover:bg-[#222]"}
          `}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default OrderTypeSelector;
