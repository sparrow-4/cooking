import React from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import heroImg from "../../assets/svg/home.svg";
import bgImage from "../../assets/svg/bg.svg";
import logo from "../../assets/svg/img.svg";

const Home = () => {
 const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-screen bg-[#0d0d0d] flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl w-full flex flex-col items-center justify-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-sm rounded-2xl overflow-hidden shadow-xl relative"
        >
          <img
            src={heroImg}
            className="w-full object-contain max-h-[60vh] md:max-h-[80vh]"
            alt="Background"
          />

          {/* Logoooo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full flex items-center justify-center backdrop-blur-sm">
              <img
                src={logo}
                className="w-28 h-28 md:w-32 md:h-32 object-contain"
                alt="Logo"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.3,
                duration: 0.8,
                ease: "easeOut",
              },
            },
          }}
          className="text-center px-3"
        >
          <h1 className="text-xl md:text-4xl font-semibold text-white">
            Welcome to Chef Kitchen
          </h1>

          <p className="mt-2 text-gray-400 text-sm md:text-lg leading-relaxed">
            Check out the awesome food experience! It’s super fresh, quick, and
            oh-so tasty!
          </p>
        </motion.div>
        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="w-full max-w-xs"
        >
          <motion.button
            onClick={() => navigate("/menu")}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(255,153,99,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-primary hover:bg-[#ff7f33] transition-all
               text-black font-medium py-3 rounded-lg text-base md:text-lg"
          >
            Explore Menu
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
