import React, { useState } from "react";
import { Button, Divider, Input, Card, Image, Dropdown } from "antd";
import { LeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
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
  const [orderItems] = useState([
    {
      id: 1,                      
      storeName: '自由公园外贸',
      orderState: '交易成功',
      productName: '古着复古90S老货库存宽松廓...',
      productDescription: '复古蓝[色差、微瑕]；M',
      productNumber: 1,
      productPrice: 55.90,
      image: '/first.jpg' 
    },
    {
      id: 2,
      storeName: '禾子先生',
      orderState: '交易成功',
      productName: 'B2024春季新品男士卫衣圆...',
      productDescription: '白色；XL',
      productNumber: 1,
      productPrice: 88.00,
      image: '/second.jpg'
    },
  ])
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
            <p style={{ marginLeft: '50%', color: "BLUE" }}>{item.orderState}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              width={100}
              src={item.image}
            />
            <div>
              <p>{item.productName}</p>
              <p style={{ color: 'gray', }}>{item.productDescription} *{item.productNumber}</p>
              <p>实付款：￥{item.productPrice}</p>
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
