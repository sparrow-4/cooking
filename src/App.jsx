import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import MenuDashboard from "./components/pages/MenuDashboard";
import NotificationsPage from "./components/pages/NotificationsPage";
import FavoritesPage from "./components/pages/FavoritesPage";
import MessagesPage from "./components/pages/MessagesPage";
import SettingsPage from "./components/pages/SettingsPage";
import Dashboard from "./components/dashboard/Dashboard";
import Category from "./components/dashboard/Category/Category";
import Ordedrs from "./components/dashboard/orders/Ordedrs";
import Product from "./components/dashboard/product/product";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* LANDING PAGE */}
        <Route path="/" element={<Home />} />

        {/* MAIN APP */}
        <Route path="/menu" element={<MenuDashboard />} />
        <Route path="/menu/notifications" element={<NotificationsPage />} />
        <Route path="/menu/favorites" element={<FavoritesPage />} />
        <Route path="/menu/messages" element={<MessagesPage />} />
        <Route path="/menu/settings" element={<SettingsPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="category" element={<Category />} />
          <Route path="products" element={<Product />} />
          <Route path="orders" element={<Ordedrs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
