



import React, { useState } from "react";
import { FiCreditCard, FiDollarSign } from "react-icons/fi";
import { FaPaypal } from "react-icons/fa";

const ReceiptPage = ({ total = 21.03, onConfirm, onCancel }) => {
  const [method, setMethod] = useState("CARD");

  return (
    <div
    className="
      fixed inset-0 z-[9999]
      flex items-center justify-center
      bg-black/60 backdrop-blur-md
      px-4
    "
  >
    <div className="-translate-y-2">
      
    <div className="w-full max-w-md mx-auto mt-0 bg-[#1F1D2B] rounded-2xl p-6 text-white">
      
      {/* Header */}
      <h2 className="text-xl font-semibold">Payment</h2>
      <p className="text-sm text-gray-400 mt-1">
        3 payment method available
      </p>

      {/* Payment Methods */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <MethodButton
          active={method === "CARD"}
          onClick={() => setMethod("CARD")}
          icon={<FiCreditCard />}
          label="Credit Card"
        />
        <MethodButton
          active={method === "PAYPAL"}
          onClick={() => setMethod("PAYPAL")}
          icon={<FaPaypal />}
          label="Paypal"
        />
        <MethodButton
          active={method === "CASH"}
          onClick={() => setMethod("CASH")}
          icon={<FiDollarSign />}
          label="Cash"
        />
      </div>

      {/* Card Form */}
      {method === "CARD" && (
        <div className="mt-6 space-y-4">
          <Input label="Cardholder Name" placeholder="Levi Ackerman" />
          <Input label="Card Number" placeholder="2568 1421 0897 1244" />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Expiration Date" placeholder="02/2026" />
            <Input label="CVV" placeholder="•••" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select label="Order Type" options={["Dine In", "Takeaway"]} />
            <Input label="Table no." placeholder="140" />
          </div>
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between items-center mt-6 border-t border-gray-700 pt-4">
        <span className="text-gray-400">Total Payment</span>
        <span className="text-xl font-semibold">{total.toFixed(2)} AED</span>

      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={onCancel}
          className="border border-gray-600 rounded-xl py-3 hover:bg-gray-700"
        >
          Cancel
        </button>

       <button
  onClick={() => onConfirm(method)}
  className="bg-primary text-black rounded-xl py-3 font-semibold"
>
  Confirm Payment
</button>

      </div>
    </div>
     </div>
    </div>
  
  );
};

/* ---------- Helpers ---------- */

const MethodButton = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center gap-2
      border rounded-xl py-4 text-sm
      ${
        active
          ? "border-primary bg-[#262837] text-primary"
          : "border-gray-600 text-gray-300 hover:border-primary"
      }
    `}
  >
    <span className="text-lg">{icon}</span>
    {label}
  </button>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-400">{label}</label>
    <input
      {...props}
      className="mt-1 w-full bg-[#2D303E] rounded-lg px-4 py-2 outline-none text-sm"
    />
  </div>
);

const Select = ({ label, options }) => (
  <div>
    <label className="text-xs text-gray-400">{label}</label>
    <select className="mt-1 w-full bg-[#2D303E] rounded-lg px-4 py-2 text-sm">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
  
);

export default ReceiptPage;
