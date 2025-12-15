import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import MenuDashboard from "./components/pages/MenuDashboard";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/menu" element={<MenuDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
