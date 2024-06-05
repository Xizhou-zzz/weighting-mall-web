import { createBrowserRouter } from "react-router-dom";
import React from 'react';
import App from "./App";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import RolePage from "./pages/RolePage";
import MenuPage from "./pages/MenuPage";
import GoodPage from "./pages/GoodPage";
import OrderPage from "./pages/OrderPage";
import MarketingPage from "./pages/MarketingPage";
import CustomPage from "./pages/CustomPage";
import MenuService from "./service/MenuService";
import ShoppingCartPage from "./pages/product/mall/ShoppingCartPage";

const menuService = new MenuService();
const menus = menuService.getMenus();

const pageComponents = {
  good: GoodPage,
  order: OrderPage,
  marketing: MarketingPage,
  home: HomePage,
  user: UserPage,
  role: RolePage,
  menu: MenuPage,
};

const customRouters = menus.map(menu => ({
  path: `/main/${menu.path}`,
  element: React.createElement(pageComponents[menu.path] || CustomPage),
}));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "main",
        element: <MainPage />,
        children: [
          ...customRouters,
        ],
      },
      // 购物车页面路由
      {
        path: "shoppingcart", element: <ShoppingCartPage />
      },
    ],
  },
]);

export default router;