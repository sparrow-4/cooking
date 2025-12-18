import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import Tabs from "../tabs/Tabs";
import DishFilterBar from "../dishes/DishFilterBar";
import DishGrid from "../dishes/DishGrid";
import OrderPanel from "../order/OrderPanel";
import Sidebar from "../SideBar/Sidebar";
import MobileNav from "../MobileNav";
import ReceiptPage from "../receipt/ReceiptPage"; 
import { FiShoppingCart } from "react-icons/fi";
import { DISHDATA } from "../../constants/assets";


function MenuDashboard() {
  const [showCart, setShowCart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeNav, setActiveNav] = useState("TODAY");

  const [cart, setCart] = useState([]);

  // ✅ RECEIPT STATE
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  /* ===== TOTAL ITEMS ===== */
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

  const [searchQuery, setSearchQuery] = useState("");
const filteredDishes = DISHDATA
  // 1️⃣ Category filter
  .filter((item) => {
    if (activeNav === "ALL") return true;
    return item.category === activeNav;
  })

  // 2️⃣ Search filter
  .filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

const [orderType, setOrderType] = useState("DINE_IN");






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
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const toggleCart = () => setShowCart((p) => !p);

  /* ===== PLACE ORDER ===== */
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    setReceiptData({
      orderId: `ORD-${Date.now()}`,
      date: new Date(),
      items: cart,
      orderType,
    });

    setShowReceipt(true);
    setCart([]); // ✅ clear cart
    setShowCart(false); // ✅ close cart panel
  };

  return (
    <div className="min-h-screen w-full bg-[#111018] relative overflow-hidden">
      {/* ===== MAIN APP CONTAINER ===== */}
      <div
        className={`
          w-full max-w-[1600px] mx-auto flex h-screen relative
          transition-all duration-300
          ${showReceipt ? "blur-sm scale-[0.98]" : ""}
        `}
      >
        {/* SIDEBAR — DESKTOP ONLY */}
        {!isMobile && <Sidebar />}

        {/* MAIN CONTENT */}
        <div
                 className={`
          flex-1 px-4 md:px-10 pb-18
          overflow-y-auto
          overscroll-contain
          scroll-smooth
          touch-pan-y
          no-scrollbar
          transition-all duration-300
          ${!isMobile && !isTablet && showCart ? "mr-[430px]" : "mr-0"}
        `}

        >
          {/* STICKY HEADER */}
          <div
            className={`${
              !isMobile && !isTablet
                ? "sticky top-0 z-40 p-5 rounded-3xl bg-[#111018]"
                : ""
            }`}
          >
            <Header
              toggleCart={toggleCart}
              isMobile={isMobile}
              isTablet={isTablet}
              totalItems={totalItems}
              onSearch={setSearchQuery}
            />
            <Tabs active={activeNav} setActive={setActiveNav} />

            <DishFilterBar onSearch={setSearchQuery} />
          </div>

         <DishGrid
  data={filteredDishes}
  addToCart={addToCart}
  cart={cart}
/>

        </div>

        {/* ===== CART PANEL ===== */}
        {showCart && (
          <div
            className={`
              fixed top-0 right-0 h-full bg-[#1F1D2B]
              ${isMobile ? "w-full z-[80]" : "w-[430px] z-[80]"}
            `}
          >
            <OrderPanel
              cart={cart}
              setCart={setCart}
              isMobile={isMobile}
              isTablet={isTablet}
              onBack={toggleCart}
              onPlaceOrder={handlePlaceOrder}
              orderType={orderType}
  setOrderType={setOrderType}
            />
          </div>
        )}
      </div>

      {/* ===== FLOATING CART (MOBILE + TABLET) ===== */}
      {(isMobile || isTablet) && !showCart && (
        <button
          onClick={toggleCart}
          className="
            fixed bottom-28 right-6 z-[999]
            w-14 h-14
            bg-[#ff9a63]
            rounded-full
            flex items-center justify-center
            shadow-[0_10px_25px_rgba(255,154,99,0.45)]
          "
        >
          <FiShoppingCart size={22} className="text-black" />
          {totalItems > 0 && (
            <span
              className="
              absolute -top-1 -right-1
              min-w-[20px] h-[20px]
              px-1
              bg-black
              text-white text-xs font-semibold
              rounded-full
              flex items-center justify-center
            "
            >
              {totalItems}
            </span>
          )}
        </button>
      )}

      {/* ===== MOBILE NAV ===== */}
      {isMobile && !showCart && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <MobileNav active={activeNav} setActive={setActiveNav} />
        </div>
      )}

      {/* RECEIPT OVERLAY */}
      {showReceipt && receiptData && (
        <ReceiptPage data={receiptData} onClose={() => setShowReceipt(false)} />
      )}
    </div>
  );
}

export default MenuDashboard;
