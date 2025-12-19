import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import MenuDashboard from "./components/pages/MenuDashboard";
import NotificationsPage from "./components/pages/NotificationsPage";
import FavoritesPage from "./components/pages/FavoritesPage";
import MessagesPage from "./components/pages/MessagesPage";
import SettingsPage from "./components/pages/SettingsPage";

// TODO: here the SidebarItem items are using mulitple times instead of that we can use the array of objects to render the sidebar items
// TODO: Here show the size also in the OrderItems
// TODO: Here the DishGrid is calling multiple times instead of that we can use the array of objects to render the dishes
// TODO: Make the component name meaning full one , like name CategoryItems
// TODO: Make the component name meaning full one
// TODO: Here the TabItem are calling multiple times instead of that we can use the array of objects to render the tabs

// TODO : Move all svg icons to the folder named "SVG"  and keep only images under the "images" folder
// TODO : Use the same colors and design exactly like in the figma design [ eg:button color  ]
// TODO : Use the same fonts and font sizes exactly like in the figma design [ Currently using ui-sans-serif , use Inter]
// TODO : The price will change on the basis of size

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
