import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

/* animations */
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /* 🔒 LOCK browser back/forward BEFORE login */
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const blockNavigation = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", blockNavigation);

    return () => {
      window.removeEventListener("popstate", blockNavigation);
    };
  }, []);

  /* SweetAlert success → navigate */
  const successAlert = (title, route) => {
    Swal.fire({
      icon: "success",
      title,
      text: "Login successful",
      timer: 1500,
      showConfirmButton: false,
      background: "#1F1D2B",
      color: "#fff",
    }).then(() => {
      navigate(route, { replace: true }); // ✅ remove login from history
    });
  };

  const errorAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid email or password",
      background: "#1F1D2B",
      color: "#fff",
      confirmButtonColor: "#ff9a63",
    });
  };

  const handleLogin = () => {
    // ADMIN
    if (email === "admin@123" && password === "123") {
      localStorage.setItem("role", "admin");
      successAlert("Welcome Admin 👋", "/dashboard");
      return;
    }

    // USER
    if (email === "user@123" && password === "123") {
      localStorage.setItem("role", "user");
      successAlert("Welcome Back 🎉", "/home");
      return;
    }

    errorAlert();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-white"
      >
        {/* HEADER */}
        <motion.div variants={item} className="text-center mb-8">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="mx-auto w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-3"
          >
            <User className="text-black" />
          </motion.div>
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
          <p className="text-sm text-gray-300">
            Login as Admin or User
          </p>
        </motion.div>

        {/* EMAIL */}
        <motion.div variants={item} className="mb-4">
          <label className="text-xs text-gray-300">Email</label>
          <motion.div
            whileFocusWithin={{ scale: 1.02 }}
            className="flex items-center gap-2 mt-1 bg-white/10 px-4 py-3 rounded-xl"
          >
            <Mail size={16} />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username"
              className="bg-transparent outline-none w-full text-sm"
            />
          </motion.div>
        </motion.div>

        {/* PASSWORD */}
        <motion.div variants={item} className="mb-6">
          <label className="text-xs text-gray-300">Password</label>
          <motion.div
            whileFocusWithin={{ scale: 1.02 }}
            className="flex items-center gap-2 mt-1 bg-white/10 px-4 py-3 rounded-xl"
          >
            <Lock size={16} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="bg-transparent outline-none w-full text-sm"
            />
          </motion.div>
        </motion.div>

        {/* LOGIN BUTTON */}
        <motion.button
          variants={item}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleLogin}
          className="w-full py-3 bg-primary text-black font-semibold rounded-xl"
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
