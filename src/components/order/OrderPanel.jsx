import React from "react";
import { FiTrash2, FiArrowLeft } from "react-icons/fi";
import OrderSummary from "./OrderSummary";
import { motion } from "framer-motion";
import { Utensils, ShoppingBag } from "lucide-react";
import { MdDeliveryDining } from "react-icons/md";

const OrderPanel = ({
  cart,
  setCart,
  isMobile,
  onBack,
  isTablet,
  onPlaceOrder,
  orderType,
  setOrderType,
}) => {
  /* ===== Quantity update ===== */
  const updateQty = (cartId, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === cartId
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  /* ===== Remove item ===== */
  const removeItem = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  return (
    <div className="bg-[#1F1D2B] h-full flex flex-col w-full sm:w-[380px] md:w-[420px] lg:w-[430px] p-6 overflow-hidden">
      
      {/* HEADER */}
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

      {/* ORDER TYPE SWITCH */}
      <div className="relative flex gap-2 mb-4 bg-[#26252d] p-1 rounded-xl">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-1 bottom-1 w-1/3 rounded-lg bg-primary"
          style={{
            left:
              orderType === "DINE_IN"
                ? "4px"
                : orderType === "DELIVERY"
                ? "33.3333%"
                : "66.6666%",
          }}
        />

        <button
          onClick={() => setOrderType("DINE_IN")}
          className={`relative z-10 flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
            orderType === "DINE_IN" ? "text-black" : "text-gray-300"
          }`}
        >
          <Utensils size={16} />
          Dine In
        </button>

        <button
          onClick={() => setOrderType("DELIVERY")}
          className={`relative z-10 flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
            orderType === "DELIVERY" ? "text-black" : "text-gray-300"
          }`}
        >
          <MdDeliveryDining size={16} />
          Delivery
        </button>

        <button
          onClick={() => setOrderType("TAKE_AWAY")}
          className={`relative z-10 flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
            orderType === "TAKE_AWAY" ? "text-black" : "text-gray-300"
          }`}
        >
          <ShoppingBag size={16} />
          Take Away
        </button>
      </div>

      {/* ITEMS LIST */}
      <div className="space-y-4 overflow-y-auto no-scrollbar pr-2 max-h-[55vh] md:max-h-[80vh] lg:max-h-[70vh]">
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
              className="bg-[#17161b] p-4 rounded-xl text-white"
            >
              {/* MAIN ROW */}
              <div className="flex items-start justify-between">
                
                {/* LEFT SIDE */}
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

                    {/* SIZE */}
                    <span className="inline-block mt-1 px-2 py-[2px] rounded-full text-[10px] bg-[#26252d] text-primary">
                      Size: {item.size}
                    </span>

                    <p className="text-xs text-gray-400 mt-1">
                      {item.price} AED × {item.qty}
                    </p>

                    <p className="text-sm font-semibold text-primary">
                      {itemTotal} AED
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-end gap-3">
                  {/* DELETE */}
                  <button
                    onClick={() => removeItem(item.cartId)}
                    className="border border-primary text-primary p-2 rounded-md transition hover:border-pink-400 hover:text-pink-400 hover:bg-pink-500/20"
                  >
                    <FiTrash2 size={16} />
                  </button>

                  {/* QUANTITY (UNDER DELETE) */}
                  <div className="flex items-center gap-2">
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
                      className="w-7 h-7 bg-primary text-black rounded-lg flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* NOTE */}
              <input
                value={item.note || ""}
                onChange={(e) =>
                  setCart((prev) =>
                    prev.map((i) =>
                      i.cartId === item.cartId
                        ? { ...i, note: e.target.value }
                        : i
                    )
                  )
                }
                placeholder="Order Note..."
                className="bg-[#221f26] text-gray-300 text-xs w-full mt-3 p-2 rounded-lg outline-none"
              />
            </div>
          );
        })}
      </div>

      {/* SUMMARY */}
      <div className="mt-auto pt-4">
        <OrderSummary
          cart={cart}
          onPlaceOrder={onPlaceOrder}
          orderType={orderType}
        />
      </div>
    </div>
  );
};

export default OrderPanel;
