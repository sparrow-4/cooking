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
  const isAdded = cart?.some((item) => item.cartId === cartId);

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
    setTimeout(() => setShowToast(false), 1800);
  };

  return (
    <>
      {/* ===== TOP-CENTER TOAST ===== */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] pointer-events-none">
          <div className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.45)] text-sm font-semibold animate-[toastPop_0.25s_ease-out]">
            ✓ {name} added to cart
          </div>
        </div>
      )}

      {/* ===== CARD ===== */}
      <div className="relative w-full flex  mt-9 flex-col group">
        {/* IMAGE */}
        <div className="absolute -top-8 sm:-top-10 w-full flex justify-center z-10">
          <img
            src={img}
            alt={name}
            className="
              w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover
              shadow-[0_12px_30px_rgba(0,0,0,0.55)]
              transition-transform duration-300
              group-hover:-translate-y-1
            "
          />
        </div>

        {/* BODY */}
        <div
          className="
            bg-[#1F1D2B]
            rounded-2xl
            pt-16 pb-6 px-6
            w-full text-center
            shadow-[0_20px_50px_rgba(0,0,0,0.45)]
            flex flex-col h-[360px]
            transition-transform duration-300
            group-hover:-translate-y-1
          "
        >
          {/* OUT OF STOCK RIBBON */}
          {isOut && (
            <span className="absolute top-4 right-4 text-xs bg-red-500/90 text-white px-3 py-1 rounded-full">
              Out
            </span>
          )}

          {/* CONTENT */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-white text-[15px] font-semibold line-clamp-2 min-h-[40px]">
              {name}
            </h3>

            {/* PRICE */}
            <div className="mt-8 flex justify-center gap-3 items-center">
              <span className="text-[13px] text-gray-500 line-through">
                {oldPrice}
              </span>
              <span className="text-[15px] text-[#ff9a63] font-semibold">
                {priceBySize[size]} AED
              </span>
            </div>

            <p className="text-gray-400 text-xs mt-1 min-h-[16px]">
              {stock}
            </p>

            {/* SIZE SELECT */}
            <div className="flex justify-center gap-3 mt-5">
              {["S", "M", "L"].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSize(sz)}
                  className={`
                    px-4 py-1 text-xs rounded-full border
                    transition-all duration-200
                    ${
                      size === sz
                        ? "bg-[#ff9a63] border-[#ff9a63] text-black scale-105"
                        : "text-gray-300 border-gray-700 hover:border-[#ff9a63]"
                    }
                  `}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleAddToCart}
            disabled={isOut || isAdded}
            className={`
              mt-6 w-full py-2 rounded-xl font-semibold
              transition-all duration-200
              ${
                isOut
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : isAdded
                  ? "bg-green-600 text-white"
                  : "bg-[#ff9a63] text-black hover:bg-[#ffa773] active:scale-95"
              }
            `}
          >
            {isOut ? "Unavailable" : isAdded ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DishCard;
