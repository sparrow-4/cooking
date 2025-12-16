import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message }]);

    // 🔔 Sound
    const audio = new Audio("/toast.mp3");
    audio.volume = 0.4;
    audio.play().catch(() => {});

    // 📳 Haptic (mobile)
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* TOAST OVERLAY */}
      {toasts.length > 0 && (
        <>
          {/* BLUR BACKDROP */}
          <div className="fixed inset-0 backdrop-blur-[2px] z-[999]" />

          {/* TOAST STACK */}
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] flex flex-col gap-3">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className="
                  flex items-center gap-3
                  bg-[#22c55e]
                  text-white
                  px-5 py-3
                  rounded-2xl
                  shadow-[0_15px_40px_rgba(0,0,0,0.45)]
                  animate-toastIn
                "
              >
                {/* CHECKMARK */}
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>

                <span className="text-sm font-semibold">
                  {toast.message}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </ToastContext.Provider>
  );
};
