import React, { useState } from "react";
import { Menu, Card, Button, Image, InputNumber, Checkbox } from "antd";
import { AppstoreOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';
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
  // 定义购物车项的数据
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '耐克（NIKE）JORDAN官方...',
      description: '160白色/沙丘红/龙虾红/帆...',
      price: 849,
      quantity: 1,
      image: '/firstshoe.jpg',
      isChecked: true,
    },
    {
      id: 2,
      name: '耐克（NIKE）官方G.T.CUT...',
      description: '004浅烟灰/尘光子色/暗灰/...',
      price: 559,
      quantity: 1,
      image: '/secondshoe.jpg',
      isChecked: true,
    }
  ]);
  // 删除购物车项的函数
  const deleteItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  // 清空购物车的函数
  const clearItem = () => {
    setCartItems([]);
  }
  // 更新商品数量的函数
  const updateQuantity = (id, value) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: value } : item));
  };
  // 更新购物车项的是否选中属性
  const handleCheckboxChange = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, isChecked: !item.isChecked } : item));
  };
  // 格式化输入，只允许输入正整数和0
  const formatNumber = (value) => {
    return String(value).replace(/[^0-9]/g, '');
  };

  return (
    <div className="shopping-cart-page">
      {/* 页面内容 */}
      <div className="content">
        <h2 className="titlePosition">购物车</h2>

        {cartItems.map(item => (
          <div key={item.id} style={{ display: "flex", alignItems: "center" }}>
            <Checkbox defaultChecked={item.isChecked} onChange={() => handleCheckboxChange(item.id)} ></Checkbox>
            <Image
              width={150}
              src={item.image}
            />
            <div>
              <p>{item.name}</p>
              <p style={{ fontSize: "12px", color: "#999" }}>{item.description}</p>
              <p>￥{item.price}</p>
              购买数量：<InputNumber min={1} max={999} value={item.quantity} onChange={(value) => updateQuantity(item.id, value)} formatter={formatNumber} parser={formatNumber} />
            </div>
            <Button danger icon={<DeleteOutlined />} onClick={() => deleteItem(item.id)}></Button>
          </div>
        ))}

        <Card className="cardStyle">
          <div className="cardContainer">
            <Button type="primary" danger className="redButtonStyle" onClick={clearItem}>清空</Button>
            <div>￥{cartItems.filter(item => item.isChecked).reduce((total, item) => total + item.price * item.quantity, 0)}元</div>
            <Button type="primary" className="blueButtonStyle">去结算</Button>
          </div>
        </Card>

      </div>
      <Menu items={menuItems} defaultSelectedKeys={['shoppingcart']} mode="horizontal" className="bottom-menu" />

    </div>
  );
};

export default ShoppingCartPage;
