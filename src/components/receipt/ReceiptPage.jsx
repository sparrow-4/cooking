import { motion } from "framer-motion";
import { Check } from "lucide-react";

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
  const subtotal = data.items.reduce(
    (sum, i) => sum + i.qty * parseFloat(i.price),
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

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

          {data.items.map((item) => (
            <div key={item.cartId} className="flex justify-between border-b border-white/10 pb-2">
              <div>
                <p>{item.name}</p>
                <p className="text-xs text-gray-400">Qty × {item.qty}</p>
              </div>
              <span>{(item.qty * item.price).toFixed(2)} AED</span>
            </div>
          ))}

          <div className="pt-3 space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Tax (5%)</span>
              <span>{tax.toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
              <span>Total</span>
              <span>{total.toFixed(2)} AED</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-4 py-3 rounded-xl bg-[#ff9a63] text-black font-semibold"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReceiptPage;
