import { useRef, useState } from "react";
import { gsap } from "gsap";
import { assets } from "../../constants/assets"; 

const OrderSummary = ({ cart, onPlaceOrder }) => {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.qty * parseFloat(item.price),
    0
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const bikeRef = useRef(null);
  const smokeRef = useRef([]);
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = () => {
    if (cart.length === 0 || loading) return;
    setLoading(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setLoading(false);
        onPlaceOrder();
      },
    });

    // Bike movement
    tl.fromTo(
      bikeRef.current,
      { x: -60, opacity: 1 },
      { x: 300, duration: 1.2, ease: "power2.inOut" }
    );

    // Smoke animation
    smokeRef.current.forEach((smoke, i) => {
      tl.fromTo(
        smoke,
        { x: -20, opacity: 0.6, scale: 0.5 },
        {
          x: 40,
          opacity: 0,
          scale: 1.4,
          duration: 0.6,
          ease: "power1.out",
        },
        i * 0.15
      );
    });
  };

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

      <div className="flex justify-between text-lg font-semibold mb-4">
        <span>Total</span>
        <span>{total.toFixed(2)} AED</span>
      </div>

      {/* BUTTON */}
      <button
        onClick={handlePlaceOrder}
        disabled={cart.length === 0 || loading}
        className="
          relative overflow-hidden
          w-full bg-[#ff9a63]
          py-3 rounded-lg
          text-black font-medium
          disabled:opacity-40
        "
      >
        {/* Smoke trail */}
        {[0, 1, 2].map((_, i) => (
          <img
            key={i}
            ref={(el) => (smokeRef.current[i] = el)}
            src={assets.smokeImg}
            alt="smoke"
            className="absolute left-6 top-1/2 -translate-y-1/2 w-4 opacity-0"
          />
        ))}

        {/* Bike PNG */}
        <img
          ref={bikeRef}
          src={assets.bikeImg}
          alt="delivery bike"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10"
        />

        {/* Text */}
        <span className="relative z-10">
          {loading ? "Delivering..." : "Place Order"}
        </span>
      </button>
    </div>
  );
};

export default OrderSummary;
