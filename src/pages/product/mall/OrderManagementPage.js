import React from "react";
import { Button, Divider, Input, Card, Image, Dropdown } from "antd";
import { LeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const OrderManagementPage = () => {
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>自由公园外贸</p>
          <p style={{ marginLeft: '50%', color: "BLUE" }}>交易成功</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            width={100}
            src={"/first.jpg"}
          />
          <div>
            <p>古着复古90S老货库存宽松廓..</p>
            <p style={{ color: 'gray', }}>复古蓝[色差、微瑕]；M *1</p>
            <p>实付款：￥55.90</p>
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

      <Card style={{ width: '94%', marginLeft: '3%', marginTop: '3%' }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>禾子先生</p>
          <p style={{ marginLeft: '50%', color: "BLUE" }}>交易成功</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            width={100}
            src={"/second.jpg"}
          />
          <div>
            <p>B2024春季新品男士卫衣圆..</p>
            <p style={{ color: 'gray', }}>白色；XL</p>
            <p>实付款：￥88.00</p>
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
    </div>
  );
};
export default OrderManagementPage;
