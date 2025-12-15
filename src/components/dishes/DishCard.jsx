import React, { useState, useMemo, useEffect } from "react";

const DishCard = ({ name, img, oldPrice, newPrice, stock, onAddToCart }) => {
  const [size, setSize] = useState("M");
  const [isAdded, setIsAdded] = useState(false);

  /* Reset Added state when size changes */
  useEffect(() => {
    setIsAdded(false);
  }, [size]);

  // Extract numeric price safely
  const basePrice = useMemo(() => {
    const numeric = parseFloat(String(newPrice).replace(/[^\d.]/g, ""));
    return Number.isFinite(numeric) ? numeric : 0;
  }, [newPrice]);

  // Price by size
  const priceBySize = useMemo(
    () => ({
      S: +(basePrice * 0.8).toFixed(2),
      M: +basePrice.toFixed(2),
      L: +(basePrice * 1.3).toFixed(2),
    }),
    [basePrice]
  );

  const isOut = stock === "Out of Stock";

  const handleAddToCart = () => {
    if (isOut || !onAddToCart || isAdded) return;

    onAddToCart({
      cartId: `${name}-${size}`,
      name,
      img,
      size,
      price: priceBySize[size],
      qty: 1,
    });

    setIsAdded(true);
  };

  return (
    <div
      className="
        relative
        w-full
        max-w-[220px]
        mx-auto
        mt-12
        flex
        flex-col
      "
    >
      {/* Floating Image */}
      <div className="absolute -top-8 sm:-top-15 flex justify-center w-full z-10">
        <img
          src={img}
          alt={name}
          className="
            w-24 h-24
            sm:w-28 sm:h-28
            rounded-full
            shadow-[0_8px_25px_rgba(0,0,0,0.45)]
          "
        />
      </div>

      {/* Card Body */}
      <div
        className="
          bg-[#1F1D2B]
          rounded-2xl
          pt-16
          pb-6
          px-6
          w-full
          text-center
          shadow-md
          flex
          flex-col
          justify-between
          select-none
        "
      >
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-white text-[15px] font-semibold leading-tight">
            {name}
          </h3>

          {/* Price */}
          <div className="mt-2 flex justify-center gap-3">
            <span className="text-[13px] text-gray-500 line-through">
              {oldPrice}
            </span>
            <span className="text-[14px] text-[#ff9a63] font-semibold">
              {priceBySize[size]} AED
            </span>
          </div>

          {/* Stock */}
          <p className="text-gray-400 text-xs mt-1">{stock}</p>

          {/* Size Selector */}
          <div className="flex justify-center gap-3 mt-5">
            {["S", "M", "L"].map((sz) => (
              <button
                key={sz}
                onClick={() => setSize(sz)}
                className={`px-4 py-1 text-xs rounded-full border transition
                  ${
                    size === sz
                      ? "bg-[#ff9a63] border-[#ff9a63] text-black"
                      : "text-gray-300 border-gray-700 hover:border-[#ff9a63]"
                  }
                `}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
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
            }
          `}
        >
          {isOut ? "Unavailable" : isAdded ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default DishCard;
