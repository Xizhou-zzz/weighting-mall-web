import React, { useState } from "react";
import { Menu, Card, Button, Image, InputNumber, Checkbox } from "antd";
import { AppstoreOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import './style.css';

const PersonalInformationPage = () => {
  // 页面最下方菜单栏数据
  const menuItems = [
    {
      label: '首页',
      key: 'homepage',
      icon: <HomeOutlined />,
    },
    {
      label: '分类',
      key: 'classification',
      icon: <AppstoreOutlined />,
    },
    {
      label: '购物车',
      key: 'shoppingcart',
      icon: <ShoppingCartOutlined />,
    },
    {
      label: '我的',
      key: 'personalinformation',
      icon: <UserOutlined />,
    },
  ];

  return (
    <div className="shopping-cart-page">
      <div className="content">
      </div>
      <Menu items={menuItems} defaultSelectedKeys={['personalinformation']} mode="horizontal" className="bottom-menu" />
    </div>
  );
};

export default PersonalInformationPage;
