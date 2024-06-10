import React, { useState, useEffect } from "react";
import { Button, Divider, Input, Card, Image, Dropdown } from "antd";
import { LeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import OrderService from '../../../service/OrderService';

const MallOrderManagement = () => {
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          卖了换钱
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          删除订单
        </a>
      ),
    },
  ];
  // 创建 OrderService 的实例
  const orderService = new OrderService();
  // 使用orderService中的getOrders()方法来获取订单数据
  // const orderData = orderService.getOrders();
  // 储存订单数据
  const [orderItems, setOrderItems] = useState([])
  // 这个变量存储搜索订单输入框中输入的内容
  const [searchTerm, setSearchTerm] = useState('');
  // 钩子函数，用于页面跳转
  const navigate = useNavigate();
  // 返回按钮的处理函数，返回个人信息页面
  const returnToPersonalInformation = () => {
    navigate('/mall/mallUser');
  }
  // 处理搜索订单输入框中内容变化的函数
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }
  // 过滤后的数据
  const filteredOrderItems = orderItems.filter(item =>
    item.storeName.includes(searchTerm) || item.productName.includes(searchTerm)
  );
  // 页面初始化时处理数据
  useEffect(() => {
    const fetchData = async () => {
      const orderData = await orderService.getOrders();
      const mappedOrders = orderData.map(order => ({
        id: order.id,
        storeName: order.storeName,
        status: order.status === 0 ? '未发货' : '已发货', // 假设0表示交易成功，1表示交易关闭
        productName: order.productName,
        amount: order.amount,
        price: parseFloat(order.price.replace('￥', '')), // 转换价格为数字
        image: order.image
      }));
      setOrderItems(mappedOrders);
    };
    fetchData();
  }, [])

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "3%" }}>
        <Button type="default" shape="circle" icon={<LeftOutlined />} style={{ marginLeft: '2%' }} onClick={returnToPersonalInformation} />
        <Input placeholder="搜索我的订单" prefix={<SearchOutlined />} style={{ width: '70%', marginLeft: '5%' }} value={searchTerm} onChange={handleSearchChange} />
      </div>
      <Divider />

      {filteredOrderItems.map(item => (
        <Card key={item.id} style={{ width: '94%', marginLeft: '3%' }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>{item.storeName}</p>
            <p style={{ marginLeft: '50%', color: "BLUE" }}>{item.status}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              width={100}
              src={item.image}
            />
            <div>
              <p>{item.productName}</p>
              <p style={{ color: 'gray', }}>*{item.amount}</p>
              <p>实付款：￥{item.price}</p>
            </div>
          </div>
          <div style={{ marginLeft: '-7%' }}>
            <Dropdown
              menu={{
                items,
              }}
              arrow
            >
              <Button type="text" width={1} style={{ color: 'gray' }}>更多</Button>
            </Dropdown>
            <Button>追加评价</Button>
            <Button>查看物流</Button>
            <Button type="primary">再买一单</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
export default MallOrderManagement;
