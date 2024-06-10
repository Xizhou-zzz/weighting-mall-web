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

import PaySuccess from "./pages/product/order/PaySuccess";
import SubmitOrder from "./pages/product/order/SubmitOrder";
import Pay from "./pages/product/order/Pay"
import PaymentMethod from "./pages/product/order/PaymentMethod";
import PaymentConfirmation from "./pages/product/order/PaymentConfirmation";


import ProductDetail from "./pages/product/order/ProductDetail";
import CreateOrder from "./pages/product/order/CreateOrder";
import OrderDetail from "./pages/product/order/OrderDetail";

import MallHome from "./pages/product/mall/mallHome";//by ly
import MallGenre from "./pages/product/mall/mallGenre";//by ly
import MallGenreChildren from "./pages/product/mall/MallGenreChildren";//by ly
import MallShoppingCar from "./pages/product/mall/mallShoppingCar";//by ly
import BrandList from "./pages/product/mall/brandList"//by ly
import Mall from "./pages/product/mall/mall";//by ly
import ProductList from "./pages/product/mall/productList"//by ly
import ProductGenreList from "./pages/product/mall/productGenreList"//by ly
import ProductBrandList from "./pages/product/mall/productBrandList"//by ly
import ProductDetail1 from "./pages/product/mall/productDetail" //by ly 这是我写重复的要改一下

import MallUser from "./pages/product/mall/mallUser";
import MallOrderManagement from "./pages/product/mall/MallOrderManagement";

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

    ],
  },
  {
    path: "/product",
    children: [
      { path: "paymentMethod", element: <PaymentMethod /> },
      { path: "paymentConfirmation", element: <PaymentConfirmation /> },
      { path: "paySuccess", element: <PaySuccess /> },
      { path: "submitOrder", element: <SubmitOrder /> },
      { path: "pay", element: <Pay /> },
      //商品详情页页面路由
      { path: "ProductDetail", element: <ProductDetail /> },
      //创建订单页面路由
      { path: "CreateOrder", element: <CreateOrder /> },
      //订单详情页面路由
      { path: "OrderDetail", element: <OrderDetail /> },
    ],
  },
  //下面是ly加的
  { path: 'productDetail/:id', element: <ProductDetail1 /> },

  {
    path: 'mall',
    element: <Mall />,
    children: [
      { path: 'mallHome', element: <MallHome /> },

      {
        path: 'mallGenre', element: <MallGenre />,
        children: [
          { path: 'clothes', element: <MallGenreChildren /> },
          { path: 'phone', element: <MallGenreChildren /> },
          { path: 'appliances', element: <MallGenreChildren /> },
          { path: 'decoration', element: <MallGenreChildren /> },
          { path: 'car', element: <MallGenreChildren /> },
          { path: 'computer', element: <MallGenreChildren /> },
        ]
      },
      { path: 'mallShoppingCar', element: <MallShoppingCar /> },
      { path: 'mallUser', element: <MallUser /> },
      { path: 'mallOrderManagement', element: <MallOrderManagement /> },
      { path: 'brandList', element: <BrandList /> },
      { path: 'productList/:id', element: <ProductList /> },
      { path: 'productGenreList/:id', element: <ProductGenreList /> },
      { path: 'productBrandList/:id', element: <ProductBrandList /> },
    ]
  },




]);

export default router;