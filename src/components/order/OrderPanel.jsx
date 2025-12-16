import React from "react";
import { FiTrash2, FiArrowLeft } from "react-icons/fi";
import OrderSummary from "./OrderSummary";

const OrderPanel = ({ cart, setCart, isMobile, onBack, isTablet }) => {
  // Increase / decrease quantity (minimum 1)
  const updateQty = (cartId, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === cartId
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  // Remove item completely
  const removeItem = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  return (
    <div
      className="
        bg-[#1F1D2B]
        h-full
        flex flex-col
        w-full
        sm:w-[380px]
        md:w-[420px]
        lg:w-[430px]
        p-6
        overflow-hidden
      "
    >
     <div className="flex items-center gap-3 mb-4">
  {(isMobile || isTablet) && (
    <button
      onClick={onBack}
      className="p-2 rounded-lg bg-[#26252d] text-white"
    >
      <FiArrowLeft size={18} />
    </button>
  )}
  <h2 className="text-xl font-semibold text-white">Orders</h2>
</div>



      {/* ===== ITEMS LIST ===== */}
     <div
  className="
    space-y-4
    overflow-y-auto
    no-scrollbar
    pr-2
    max-h-[55vh]
    md:max-h-[80vh]
    lg:max-h-[70vh]
  "
>

        {cart.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-10">
            Cart is empty
          </p>
        )}

        {cart.map((item) => {
          const itemTotal = (item.price * item.qty).toFixed(2);

          return (
            <div
              key={item.cartId}
              className="bg-[#17161b] p-4 rounded-xl text-white select-none"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 rounded-full"
                  />

                  <div>
                    <p className="text-sm font-medium truncate w-36">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {item.price} AED × {item.qty}
                    </p>

                    <p className="text-sm font-semibold text-[#ff9a63]">
                      {itemTotal} AED
                    </p>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeItem(item.cartId)}
                  className="border border-pink-400 p-2 rounded-md text-pink-400 hover:bg-pink-500/20 transition"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => updateQty(item.cartId, -1)}
                  disabled={item.qty <= 1}
                  className="w-7 h-7 bg-[#26252d] rounded-lg flex items-center justify-center disabled:opacity-40"
                >
                  –
                </button>

                <span className="min-w-[32px] text-center bg-[#26252d] px-3 py-1 rounded-lg">
                  {item.qty}
                </span>

                <button
                  onClick={() => updateQty(item.cartId, 1)}
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
        })}
      </div>

      {/* ===== SUMMARY (STICKY AT BOTTOM) ===== */}
      <div className="mt-auto pt-4">
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
};

export default OrderPanel;
