import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PACKING_CHARGE = 2.0;
const DELIVERY_CHARGE = 5.0;

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const card = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const ReceiptPage = ({ data, onClose }) => {
  if (!data) return null;

  const orderType = data.orderType?.toUpperCase();

  const subtotal = data.items.reduce(
    (sum, item) => sum + item.qty * parseFloat(item.price),
    0
  );

  const packingCharge = orderType === "TAKE_AWAY" ? PACKING_CHARGE : 0;
  const deliveryCharge = orderType === "DELIVERY" ? DELIVERY_CHARGE : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + tax + packingCharge + deliveryCharge;

  const ORDER_TYPE_LABELS = {
    DINE_IN: "Dine In",
    TAKE_AWAY: "Take Away",
    DELIVERY: "Delivery",
  };

  return (
    <motion.div
      variants={backdrop}
      initial="hidden"
      animate="visible"
      className="
        fixed inset-0 z-[9999]
        bg-black/50
        backdrop-blur-sm
        flex items-center justify-center
        px-4
      "
    >
      <motion.div
        variants={card}
        initial="hidden"
        animate="visible"
        className="
          w-full max-w-[420px]
          rounded-2xl
          bg-[#1F1D2B]/90
          backdrop-blur-xl
          border border-white/10
          shadow-2xl
          text-white
        "
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#ff9a63] to-[#ff7a2f] p-5 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Check size={22} strokeWidth={3} />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Payment Successful</h2>
              <p className="text-xs opacity-80">{data.orderId}</p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4 text-sm">
          <p className="text-gray-400">
            {new Date(data.date).toLocaleString()}
          </p>

          {/* ITEMS */}
          {data.items.map((item) => (
            <div
              key={item.cartId}
              className="flex justify-between border-b border-white/10 pb-2"
            >
              <div>
                <p className="text-xs text-gray-400">Qty × {item.qty}</p>

                {item.note && (
                  <p className="text-xs text-red-400 italic">
                    Note: {item.note}
                  </p>
                )}
              </div>
              <span>{(item.qty * item.price).toFixed(2)} AED</span>
            </div>
          ))}

          {/* ORDER TYPE */}
          {orderType && (
            <div className="flex justify-between text-gray-300 text-sm pt-2">
              <span>Order Type</span>
              <span className="font-medium">
                {ORDER_TYPE_LABELS[orderType]}
              </span>
            </div>
          )}

          {/* TOTALS */}
          <div className="pt-3 space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} AED</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Tax (5%)</span>
              <span>{tax.toFixed(2)} AED</span>
            </div>

            {orderType === "TAKE_AWAY" && (
              <div className="flex justify-between text-gray-300">
                <span>Packing Charge</span>
                <span>{PACKING_CHARGE.toFixed(2)} AED</span>
              </div>
            )}
            {orderType === "DELIVERY" && (
              <div className="flex justify-between text-gray-300">
                <span>Delivery Charge</span>
                <span>{DELIVERY_CHARGE.toFixed(2)} AED</span>
              </div>
            )}

            <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
              <span>Total</span>
              <span>{total.toFixed(2)} AED</span>
            </div>
          </div>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="
              w-full mt-4 py-3
              rounded-xl
              bg-primary
              text-black
              font-semibold
            "
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReceiptPage;
