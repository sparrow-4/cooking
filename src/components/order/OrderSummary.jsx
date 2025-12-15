const OrderSummary = ({ cart }) => {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.qty * parseFloat(item.price),
    0
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="text-white">
      <div className="flex justify-between text-gray-300 text-sm mb-2">
        <span>Items</span>
        <span>{cart.length}</span>
      </div>

      <div className="flex justify-between text-gray-300 text-sm mb-2">
        <span>Subtotal</span>
        <span>{subtotal.toFixed(2)} AED</span>
      </div>

      <div className="flex justify-between text-gray-300 text-sm mb-2">
        <span>Tax (5%)</span>
        <span>{tax.toFixed(2)} AED</span>
      </div>

      <div className="border-t border-gray-700 my-2" />

      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>{total.toFixed(2)} AED</span>
      </div>

      <button className="w-full mt-5 bg-orange-500 py-3 rounded-lg text-black font-medium">
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
