import React from "react";
import { Menu } from "antd";

const ShoppingCartPage = () => {
  // 页面最下方菜单栏数据
  const menuItems = [
    {
      label: '首页',
      key: 'homepage',
      // icon: <MailOutlined />,
    },
    {
      label: '分类',
      key: 'classification',
      // icon: <AppstoreOutlined />,
    },
    {
      label: '购物车',
      key: 'shoppingcart',
      // icon: <AppstoreOutlined />,
    },
    {
      label: '我的',
      key: 'personalinformation',
      // icon: <AppstoreOutlined />,
    },
  ];


  return (
    <div>
      <Menu items={menuItems} defaultSelectedKeys={['shoppingcart']} mode="horizontal" />
    </div>
  );
};

export default ShoppingCartPage;
