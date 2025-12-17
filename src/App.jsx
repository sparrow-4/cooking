import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import MenuDashboard from "./components/pages/MenuDashboard";
import NotificationsPage from "./components/pages/NotificationsPage";
import FavoritesPage from "./components/pages/FavoritesPage";
import MessagesPage from "./components/pages/MessagesPage";
import SettingsPage from "./components/pages/SettingsPage";

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
