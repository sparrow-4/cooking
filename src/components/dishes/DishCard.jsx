import React, { useState, useMemo } from "react";

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
  const isAdded = cart?.some(item => item.cartId === cartId);

  const handleAddToCart = () => {
    if (isOut || isAdded) return;

    onAddToCart({
      cartId,
      name,
      img,
      size,
      price: priceBySize[size],
      qty: 1,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      {/* ===== TOAST ===== */}
      {showToast && (
        <div className="fixed top-6 right-6 z-[999] bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg">
          {name} added to cart
        </div>
      )}

      {/* ===== CARD ===== */}
      <div className="relative w-full mt-12 flex flex-col">
        {/* IMAGE */}
        <div className="absolute -top-8 sm:-top-10 flex justify-center w-full z-10">
          <img
            src={img}
            alt={name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-[0_8px_25px_rgba(0,0,0,0.45)]"
          />
        </div>

        {/* BODY */}
        <div className="bg-[#1F1D2B] rounded-2xl pt-20 pb-6 px-6 w-full text-center shadow-md flex flex-col h-[360px]">
          {/* TOP CONTENT */}
          <div className="flex-1 flex flex-col">
            {/* TITLE — FIXED HEIGHT */}
            <h3 className="text-white text-[15px] font-semibold line-clamp-2 min-h-[40px]">
              {name}
            </h3>

            {/* PRICE */}
            <div className="mt-10 flex justify-center gap-3">
              <span className="text-[13px] text-gray-500 line-through">
                {oldPrice}
              </span>
              <span className="text-[14px] text-[#ff9a63] font-semibold">
                {priceBySize[size]} AED
              </span>
            </div>

            {/* STOCK */}
            <p className="text-gray-400 text-xs mt-1 min-h-[16px]">
              {stock}
            </p>

            {/* SIZE SELECTOR */}
            <div className="flex justify-center gap-3 mt-5">
              {["S", "M", "L"].map(sz => (
                <button
                  key={sz}
                  onClick={() => setSize(sz)}
                  className={`px-4 py-1 text-xs rounded-full border transition
                    ${
                      size === sz
                        ? "bg-[#ff9a63] border-[#ff9a63] text-black"
                        : "text-gray-300 border-gray-700 hover:border-[#ff9a63]"
                    }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* CTA — ALWAYS ALIGNED */}
          <button
            onClick={handleAddToCart}
            disabled={isOut || isAdded}
            className={`mt-6 w-full py-2 rounded-xl font-semibold transition
              ${
                isOut
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : isAdded
                  ? "bg-green-600 text-white cursor-default"
                  : "bg-[#ff9a63] text-black hover:bg-[#ffa773]"
              }`}
          >
            {isOut ? "Unavailable" : isAdded ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DishCard;
