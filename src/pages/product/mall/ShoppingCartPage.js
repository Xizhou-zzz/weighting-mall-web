import React from "react";
import { Menu, Card, Button } from "antd";
import { AppstoreOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import './style.css';

const ShoppingCartPage = () => {
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
      {/* 页面内容 */}
      <div className="content">
        <h2 className="titlePosition">购物车</h2>
        <Card className="cardStyle">
          <div className="cardContainer">
            <Button type="primary" danger className="redButtonStyle">清空</Button>
            <div>￥5098元</div>
            <Button type="primary" className="blueButtonStyle">去结算</Button>
          </div>
        </Card>

      </div>
      <Menu items={menuItems} defaultSelectedKeys={['shoppingcart']} mode="horizontal" className="bottom-menu" />

    </div>
  );
};

export default ShoppingCartPage;
