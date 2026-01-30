import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  const handleLogin = () => {
    // ADMIN
    if (email === "admin@123" && password === "123") {
      localStorage.setItem("role", "admin");
      toast.success("Welcome Admin 👋");
      navigate("/dashboard");
      return;
    }

    // USER
    if (email === "user@123" && password === "123") {
      localStorage.setItem("role", "user");
      toast.success("Login successful 🎉");
      navigate("/home");
      return;
    }

    toast.error("Invalid email or password ❌");
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
              placeholder="email@123"
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

        {/* HINT */}
        <motion.p
          variants={item}
          className="text-[11px] text-gray-400 text-center mt-6"
        >
          Admin → admin@123 / 123 <br />
          User → user@123 / 123
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
