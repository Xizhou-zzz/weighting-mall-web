import React from "react";
import { Button, Divider, Input, Card, Image } from "antd";
import { LeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const OrderManagementPage = () => {
  // 钩子函数，用于页面跳转
  const navigate = useNavigate();
  // 返回按钮的处理函数，返回个人信息页面
  const returnToPersonalInformation = () => {
    navigate('/product/personalinformation');
  }
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "3%" }}>
        <Button type="default" shape="circle" icon={<LeftOutlined />} style={{ marginLeft: '2%' }} onClick={returnToPersonalInformation} />
        <Input placeholder="搜索我的订单" prefix={<SearchOutlined />} style={{ width: '70%', marginLeft: '5%' }} />
      </div>
      <Divider />
      <Card style={{ width: '94%', marginLeft: '3%' }}>
        <div>
          自由公园外贸
        </div>
        <Image
          width={100}
          src={"/first.jpg"}
        />


      </Card>
      <Card style={{ width: '94%', marginLeft: '3%', marginTop: '3%' }}>
        <div>
          禾子先生
        </div>
        <Image
          width={100}
          src={"/second.jpg"}
        />


      </Card>
    </div>
  );
};
export default OrderManagementPage;
