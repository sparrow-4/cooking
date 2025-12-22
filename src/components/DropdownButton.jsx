import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, ShoppingBag } from "lucide-react";
import { MdDeliveryDining } from "react-icons/md";

const ORDER_TYPES = [
  {
    id: "DINE_IN",
    label: "Dine In",
    icon: <Utensils size={16} />,
    bg: "bg-emerald-600",
  },
  {
    id: "DELIVERY",
    label: "Delivery",
    icon: <MdDeliveryDining size={18} />,
    bg: "bg-orange-500",
  },
  {
    id: "TAKE_AWAY",
    label: "Take Away",
    icon: <ShoppingBag size={16} />,
    bg: "bg-sky-600",
  },
];

const OrderTypeButton = () => {
  const [type, setType] = useState("DINE_IN");

  const currentIndex = ORDER_TYPES.findIndex((t) => t.id === type);
  const current = ORDER_TYPES[currentIndex];

  const cycleType = () => {
    setType(ORDER_TYPES[(currentIndex + 1) % ORDER_TYPES.length].id);
  };

  return (
    <motion.button
      onClick={cycleType}
      whileTap={{ scale: 0.94 }}
      className={`
        relative px-5 py-2 rounded-xl
        flex items-center gap-2
        text-white font-medium
        overflow-hidden
        ${current.bg}
      `}
    >
      {/* ICON ANIMATION */}
      <AnimatePresence mode="wait">
        <motion.span
          key={current.id + "-icon"}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {current.icon}
        </motion.span>
      </AnimatePresence>

      {/* TEXT ANIMATION */}
      <AnimatePresence mode="wait">
        <motion.span
          key={current.id + "-text"}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.25 }}
        >
          {current.label}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default OrderTypeButton;
