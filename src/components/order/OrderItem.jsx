import React from "react";
import { FiTrash2 } from "react-icons/fi";

const OrderItem = ({ item, updateQty, removeItem }) => {
  const { id, name, img, price, qty } = item;

  const totalPrice = (price * qty).toFixed(2);

  return (
    <div className="bg-[#17161b] p-4 rounded-xl text-white select-none">
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <img src={img} alt={name} className="w-12 h-12 rounded-full" />

          {/* Name + Price */}
          <div className="flex flex-col">
            <p className="text-sm font-medium truncate w-36">
              {name}
            </p>

            {/* Unit price */}
            <span className="text-xs text-gray-400">
              {price} AED × {qty}
            </span>

            {/* Total price */}
            <span className="text-sm font-semibold text-[#ff9a63]">
              {totalPrice} AED
            </span>
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={() => removeItem(id)}
          className="border border-pink-400 p-2 rounded-md text-pink-400 hover:bg-pink-500/20 transition"
        >
          <FiTrash2 size={16} />
        </button>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={() => updateQty(id, qty - 1)}
          disabled={qty <= 1}
          className="w-7 h-7 bg-[#26252d] rounded-lg flex items-center justify-center disabled:opacity-40"
        >
          –
        </button>

        <span className="min-w-[32px] text-center bg-[#26252d] px-3 py-1 rounded-lg">
          {qty}
        </span>

        <button
          onClick={() => updateQty(id, qty + 1)}
          className="w-7 h-7 bg-[#ff9a63] text-black rounded-lg flex items-center justify-center"
        >
          +
        </button>
      </div>

      {/* Order note */}
      <input
        placeholder="Order Note..."
        className="bg-[#221f26] text-gray-300 text-xs w-full mt-3 p-2 rounded-lg outline-none"
      />
    </div>
  );
};

export default OrderItem;
