import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import Tabs from "../tabs/Tabs";
import DishFilterBar from "../dishes/DishFilterBar";
import DishGrid from "../dishes/DishGrid";
import OrderPanel from "../order/OrderPanel";
import Sidebar from "../SideBar/Sidebar";
import MobileNav from "../MobileNav";
import { FiShoppingCart } from "react-icons/fi";

function MenuDashboard() {
  const [showCart, setShowCart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [cart, setCart] = useState([]);

  /* ===== DEVICE DETECTION ===== */
  useEffect(() => {
    const checkScreen = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* ===== ADD TO CART ===== */
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.cartId === item.cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === item.cartId ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, item];
    });
  };

  const toggleCart = () => setShowCart((p) => !p);

  return (
    // backgr outer
    <div className="min-h-screen w-full bg-black flex justify-center">
      <div className="w-full max-w-[1600px] flex  h-screen bg-[#111018] overflow-hidden relative">
        {!isMobile && <Sidebar />}

        <div
          className={`
            flex-1 px-4 md:px-10 pb-5 overflow-y-auto
            transition-all duration-300
            ${!isMobile && !isTablet && showCart ? "mr-[430px]" : "mr-0"}
          `}
        >
          <div
            className={`
    ${!isMobile && !isTablet ? "sticky top-0 z-40 bg-[#111018]" : ""}
  `}
          >
            <Header
              toggleCart={toggleCart}
              isMobile={isMobile}
              isTablet={isTablet}
            />
            <Tabs />
            <DishFilterBar />
          </div>

          <DishGrid
            showCart={showCart}
            isMobile={isMobile}
            isTablet={isTablet}
            addToCart={addToCart}
            cart={cart}
          />
        </div>

        {/* ===== CART OVERLAY ===== */}
        {showCart && (
          <div
            className={`
              fixed top-0 right-0 h-full bg-[#1F1D2B]
              ${isMobile ? "w-full z-40" : "w-[430px] z-50"}
            `}
          >
            <OrderPanel cart={cart} setCart={setCart} />
          </div>
        )}

        {/* FLOATING CART – MOBILE + TABLET */}
        {(isMobile || isTablet) && (
          <button
            onClick={toggleCart}
            className="
              fixed bottom-28 right-6 z-50
              w-14 h-14
              bg-[#ff9a63]
              rounded-full
              flex items-center justify-center
              shadow-[0_10px_25px_rgba(255,154,99,0.45)]
            "
          >
            <FiShoppingCart size={22} className="text-black" />
          </button>
        )}

        {/* MOBILE NAV – MOBILE ONLY */}
        {isMobile && !showCart && (
  <div className="fixed bottom-0 left-0 right-0 z-50">
    <MobileNav active={activeNav} setActive={setActiveNav} />
  </div>
)}

      </div>
    </div>
  );
}

export default MenuDashboard;
