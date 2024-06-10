//商城的购物车浅浅浅写一下by ly, 只是测试可以删掉

// 修改后的购物车页面
import React, { useState } from "react";
import { Card, Button, Image, InputNumber, Checkbox } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './style.css';
const MallShoppingCar = () => {
    // 钩子函数，用于页面跳转
    const navigate = useNavigate();
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
        },
        {
            id: 3,
            name: 'Apple/苹果 iPhone 15',
            description: '蓝色',
            price: 4899,
            quantity: 1,
            image: 'https://picture.gptkong.com/20240609/2328f4bafbade14502aa3d6f012723383c.jpg',
            isChecked: true,
            originalPrice: "￥5999",
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

    // 去结算按钮的函数
    const goToCheckout = () => {
        const selectedItems = cartItems.filter(item => item.isChecked);
        navigate("/product/CreateOrder", { state: { selectedItems } });
        // navigate("/CreateOrder");
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
                        <div>￥{cartItems.filter(item => item.isChecked).reduce((total, item) => total + item.price * item.quantity, 0)}</div>
                        <Button type="primary" className="blueButtonStyle" onClick={goToCheckout}>去结算</Button>
                    </div>
                </Card>

            </div>

        </div>
    );
};

export default MallShoppingCar;