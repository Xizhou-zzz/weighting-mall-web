import React, { useState, useEffect } from "react";
import { Button, Divider, Input, Card, Image, Modal } from "antd";
import { LeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import OrderService from '../../../service/OrderService';

const MallOrderManagement = () => {
  // 处理删除订单的逻辑
  const showDeleteConfirm = (orderId) => {
    // 保存该订单的id
    setCurrentOrderId(orderId);
    // 显示对话框
    setIsModalVisible(true);
  }
  // 对话框点击确认的处理逻辑
  const handleOk = async () => {
    // 这里只在页面中删除订单，没有触及存储
    // await orderService.deleteOrder(currentOrderId);
    setOrderItems(orderItems.filter(order => order.id !== currentOrderId));
    setIsModalVisible(false);
  }
  // 对话框点击取消的处理逻辑
  const handleCancel = () => {
    setIsModalVisible(false);
  }



  // 创建 OrderService 的实例
  const orderService = new OrderService();
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
  // 控制确认对话框是否的可见的变量
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 存储即将删除的订单Id
  const [currentOrderId, setCurrentOrderId] = useState(null);


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
            <Button danger onClick={() => showDeleteConfirm(item.id)}>删除订单</Button>
            <Button>追加评价</Button>
            <Button type="primary">再买一单</Button>
          </div>
        </Card>
      ))}
      {/* 是否确认删除订单信息的对话框 */}
      <Modal
        title="删除订单"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>确定要删除该订单吗？删除后不可恢复。</p>
      </Modal>
    </div>
  );
};
export default MallOrderManagement;
