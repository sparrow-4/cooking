import React, { useEffect, useState } from "react";

const ORDERS_KEY = "admin_orders";

const Ordedrs = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    setOrders(savedOrders);
  }, []);

  /* ===== REMOVE ORDER ===== */
  const removeOrder = (orderId) => {
    const updatedOrders = orders.filter(
      (order) => order.orderId !== orderId
    );

    setOrders(updatedOrders);
    localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify(updatedOrders)
    );
  };

  return (
    <div className="p-6 text-white">
      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <p className="text-sm text-gray-400">
          Manage and review customer orders
        </p>
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 && (
        <div className="flex items-center justify-center h-60 text-gray-400">
          No orders found
        </div>
      )}

      {/* ORDERS LIST */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="rounded-2xl bg-[#1F1D2B] border border-gray-700 overflow-hidden"
          >
            {/* ORDER HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
              <div>
                <p className="text-sm font-medium">
                  Order ID:{" "}
                  <span className="text-primary">
                    {order.orderId}
                  </span>
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(order.date).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => removeOrder(order.orderId)}
                className="px-3 py-1 text-xs rounded-lg border border-green-500 text-green-400 hover:bg-green-500/10"
              >
                complete order
              </button>
            </div>

            {/* ITEMS */}
            <div className="p-5 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.cartId}
                  className="flex items-center gap-4 bg-[#17161b] p-3 rounded-xl"
                >
                  {/* IMAGE */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />

                  {/* INFO */}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
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
            <div className="flex justify-between items-center px-5 py-4 border-t border-gray-700 bg-[#17161b]">
              <span className="text-sm text-gray-400">
                Order Total
              </span>
              <span className="text-lg font-semibold">
                {order.total.toFixed(2)} AED
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ordedrs;
