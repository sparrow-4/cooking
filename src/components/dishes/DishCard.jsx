import React, { useState, useMemo, useRef } from "react";
import { gsap } from "gsap";

const DishCard = ({
  name,
  img,
  oldPrice,
  newPrice,
  stock,
  onAddToCart,
  cart,
}) => {
  const [size, setSize] = useState("M");
  const [showToast, setShowToast] = useState(false);

  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const btnRef = useRef(null);

  /* ===== PRICE LOGIC ===== */
  const basePrice = useMemo(() => {
    const numeric = parseFloat(String(newPrice).replace(/[^\d.]/g, ""));
    return Number.isFinite(numeric) ? numeric : 0;
  }, [newPrice]);

  const priceBySize = useMemo(
    () => ({
      S: +(basePrice * 0.8).toFixed(2),
      M: +basePrice.toFixed(2),
      L: +(basePrice * 1.3).toFixed(2),
    }),
    [basePrice]
  );

  const isOut = stock === "Out of Stock";
  const cartId = `${name}-${size}`;
  const isAdded = cart?.some((item) => item.cartId === cartId);

  /* ===== GSAP HOVER ===== */
  const onHover = () => {
    gsap.to(cardRef.current, {
      y: -6,
      boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(imgRef.current, {
      y: -4,
      scale: 1.05,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(imgRef.current, {
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  /* ===== ADD TO CART ===== */
  const handleAddToCart = () => {
    if (isOut || isAdded) return;

    // Button press animation
    gsap.fromTo(
      btnRef.current,
      { scale: 1 },
      { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 }
    );

    // Card glow pulse
    gsap.fromTo(
      cardRef.current,
      { boxShadow: "0 0 0 rgba(255,154,99,0)" },
      {
        boxShadow: "0 0 30px rgba(255,154,99,0.45)",
        duration: 0.35,
        yoyo: true,
        repeat: 1,
      }
    );

    onAddToCart({
      cartId,
      name,
      img,
      size,
      price: priceBySize[size],
      qty: 1,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 1600);
  };

  return (
    <>
      {/* TOAST */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999]">
          <div className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow-lg text-sm font-semibold">
            ✓ {name} added to cart
          </div>
        </div>
      )}

      {/* CARD */}
      <div
        ref={cardRef}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="relative mt-10 bg-[#1F1D2B] rounded-2xl px-6 pt-16 pb-5 text-center transition"
      >
        {/* IMAGE */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <img
            ref={imgRef}
            src={img}
            alt={name}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        <h3 className="text-white text-sm font-semibold line-clamp-2 min-h-[40px]">
          {name}
        </h3>

        {/* PRICE */}
        <div className="mt-4 flex justify-center gap-3 items-center">
          <span className="text-xs text-gray-500 line-through">
            {oldPrice}
          </span>
          <span className="text-[#ff9a63] font-semibold">
            {priceBySize[size]} AED
          </span>
        </div>

        <p className="text-gray-400 text-xs mt-1">{stock}</p>

        {/* SIZE */}
        <div className="flex justify-center gap-3 mt-4">
          {["S", "M", "L"].map((sz) => (
            <button
              key={sz}
              onClick={() => setSize(sz)}
              className={`
                px-4 py-1 text-xs rounded-full border transition
                ${
                  size === sz
                    ? "bg-[#ff9a63] text-black border-[#ff9a63]"
                    : "border-gray-700 text-gray-300 hover:border-[#ff9a63]"
                }
              `}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          ref={btnRef}
          onClick={handleAddToCart}
          disabled={isOut || isAdded}
          className={`
            mt-5 w-full py-2 rounded-xl font-semibold transition
            ${
              isOut
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : isAdded
                ? "bg-green-600 text-white"
                : "bg-[#ff9a63] text-black hover:bg-[#ffa773]"
            }
          `}
        >
          {isOut ? "Unavailable" : isAdded ? "Added ✓" : "Add"}
        </button>
      </div>
    </>
  );
};

export default DishCard;
