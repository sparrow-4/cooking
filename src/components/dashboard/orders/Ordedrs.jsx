import React, { useEffect, useState } from 'react'



const Ordedrs = () => {
  const [orders, setOrders] = useState([]);

useEffect(() => {
  const savedOrders =
    JSON.parse(localStorage.getItem("admin_orders")) || [];
  setOrders(savedOrders);
}, []);
  return (
    <div>Ordedrs


      {orders.map((order) => (
  <div
    key={order.orderId}
    className="mb-6 p-4 rounded-xl border border-gray-700 bg-[#1F1D2B]"
  >
    {/* ORDER HEADER */}
    <div className="flex justify-between mb-3 text-sm text-gray-300">
      <span>Order ID: {order.orderId}</span>
      <span>{new Date(order.date).toLocaleString()}</span>
    </div>

    {/* ITEMS */}
    <div className="space-y-3">
      {order.items.map((item) => (
        <div
          key={item.cartId}
          className="flex items-center gap-4 bg-[#17161b] p-3 rounded-lg"
        >
          {/* IMAGE */}
          <img
            src={item.img}
            alt={item.name}
            className="w-12 h-12 rounded-lg object-cover"
          />

          {/* NAME + QTY */}
          <div className="flex-1">
            <p className="text-white text-sm font-medium">
              {item.name}
            </p>
            <p className="text-xs text-gray-400">
              Qty: {item.qty} × {item.price} AED
            </p>

            {item.note && (
              <p className="text-xs text-red-400 italic">
                Note: {item.note}
              </p>
            )}
          </div>

          {/* ITEM TOTAL */}
          <span className="text-sm font-semibold text-primary">
            {(item.qty * item.price).toFixed(2)} AED
          </span>
        </div>
      ))}
    </div>

    {/* ORDER TOTAL */}
    <div className="flex justify-between mt-4 border-t border-gray-700 pt-3 text-sm">
      <span className="text-gray-400">Total</span>
      <span className="font-semibold text-white">
        {order.total.toFixed(2)} AED
      </span>
    </div>
  </div>
))}


    </div>
  )
}

export default Ordedrs