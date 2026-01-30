// 


import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import CategoryTabs from "../tabs/CategoryTabs";
import DishFilterBar from "../dishes/DishFilterBar";
import DishGrid from "../dishes/DishGrid";
import OrderPanel from "../order/OrderPanel";
import Sidebar from "../SideBar/Sidebar";
import MobileNav from "../MobileNav";
import ReceiptPage from "../receipt/ReceiptPage";
import { FiShoppingCart } from "react-icons/fi";


const PRODUCT_KEY = "products";

function MenuDashboard() {
  const [showCart, setShowCart] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeNav, setActiveNav] = useState("ALL");
  const [paymentMethod, setPaymentMethod] = useState(null);


  /* ===== PRODUCTS (FROM LOCAL STORAGE) ===== */
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = () => {
      const saved = localStorage.getItem(PRODUCT_KEY);
      setProducts(saved ? JSON.parse(saved) : []);
    };

    loadProducts();

    // sync when admin updates products
    window.addEventListener("storage", loadProducts);
    return () => window.removeEventListener("storage", loadProducts);
  }, []);

  /* ===== CART ===== */
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ===== RECEIPT ===== */
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

  /* ===== SEARCH ===== */
  const [searchQuery, setSearchQuery] = useState("");

  /* ===== CATEGORY + SEARCH FILTER ===== */
  const filteredDishes = products
    .filter((item) => {
      if (activeNav === "ALL") return true;
      return item.categoryId === activeNav; // 🔥 IMPORTANT
    })
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
  
const handlePaymentConfirm = (method) => {
  if (cart.length === 0) return;

  setPaymentMethod(method);

  setReceiptData({
    orderId: `ORD-${Date.now()}`,
    date: new Date(),
    items: cart,
    orderType,
    paymentMethod: method,
  });

  setShowReceipt(true);
  setCart([]);
  setShowCart(false);
};
  


  return (
    <div className="min-h-screen w-full bg-[#111018] relative overflow-hidden">
      <div
        className={`
          w-full max-w-[1600px] mx-auto flex h-screen relative
          transition-all duration-300
          ${showReceipt ? "blur-sm scale-[0.98]" : ""}
        `}
      >
        {!isMobile && <Sidebar />}

        <div
          className={`
            flex-1 px-4 md:px-10 pb-18
            overflow-y-auto no-scrollbar
            transition-all duration-300
            ${!isMobile && !isTablet && showCart ? "mr-[430px]" : "mr-0"}
          `}
        >
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

            <CategoryTabs active={activeNav} setActive={setActiveNav} />
            <DishFilterBar onSearch={setSearchQuery} />
          </div>

          {/* 🔥 THIS NOW SHOWS ADMIN PRODUCTS */}
          <DishGrid
            data={filteredDishes}
            addToCart={addToCart}
            cart={cart}
          />
        </div>

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
              onConfirmPayment={handlePaymentConfirm}
              orderType={orderType}
              setOrderType={setOrderType}
            />
          </div>
        )}
      </div>

      {(isMobile || isTablet) && !showCart && (
        <button
          onClick={toggleCart}
          className="
            fixed bottom-28 right-6 z-[999]
            w-14 h-14 bg-primary rounded-full
            flex items-center justify-center
          "
        >
          <FiShoppingCart size={22} className="text-black" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full px-1">
              {totalItems}
            </span>
          )}
        </button>
      )}

      {isMobile && !showCart && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <MobileNav active={activeNav} setActive={setActiveNav} />
        </div>
      )}

     


      {showReceipt && receiptData && (
        
        <ReceiptPage
          data={receiptData}
          
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
}

export default MenuDashboard;
