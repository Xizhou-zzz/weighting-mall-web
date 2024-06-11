import React from "react";
import { Card, Button, Avatar, Divider, Tooltip } from "antd";
import { MessageOutlined, SettingOutlined, ProfileOutlined, MoneyCollectOutlined, TruckOutlined, TransactionOutlined, EnvironmentOutlined, RightOutlined, HeartOutlined, StarOutlined, CommentOutlined, ClockCircleOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './style.css';
const MallUser = () => {

  // 钩子函数，用于页面跳转
  const navigate = useNavigate();
  // 点击我的订单跳转到订单管理页面
  const toOrderManagement = () => {
    navigate('/mall/mallOrderManagement');
  }
  // 点击按钮跳转回登录页面
  const toLogin = () => {
    navigate('/main');
  }

  return (
    <div className="shopping-cart-page">
      <div className="content">
        <div className="buttonPosition">
          <Tooltip title="退出登录">
            <Button type="link" icon={<LeftOutlined />} onClick={toLogin}></Button>
          </Tooltip>
          <Button type="link" icon={<MessageOutlined />}></Button>
          <Button type="link" icon={<SettingOutlined />}></Button>
        </div>
        <div style={{ display: "flex", alignItems: "center", position: 'relative', left: '5%', top: '1%' }}>
          <Avatar src='/avatar.jpg' size={64}></Avatar>
          <p>Tlectronic</p>
        </div>
        <p style={{ position: 'relative', left: '8%', top: '1%', color: 'gray' }}>白银会员</p>
        <Button type="text" style={{ position: 'relative', left: '70%', top: '-6%' }}>立即开通</Button>
        <Divider style={{ position: 'relative', top: '-5%' }} />

        <Card style={{ position: 'relative', top: '-5%', width: '94%', left: '3%' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <p style={{ fontSize: '18px' }} >5000</p>
              <p style={{ color: 'gray' }} >积分</p>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <p style={{ fontSize: '18px' }} >1000</p>
              <p style={{ color: 'gray' }} >成长值</p>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <p style={{ fontSize: '18px' }} >暂无</p>
              <p style={{ color: 'gray' }} >优惠券</p>
            </div>
          </div>
        </Card>

        <Card style={{ position: 'relative', top: '-3%', width: '94%', left: '3%' }}>
          <div style={{ display: 'flex' }}>
            <div onClick={toOrderManagement} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <ProfileOutlined />
              <p>全部订单</p>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <MoneyCollectOutlined />
              <p>待付款</p>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <TruckOutlined />
              <p>待收货</p>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <TransactionOutlined />
              <p>退款/售后</p>
            </div>
          </div>
        </Card>

        <Card style={{ position: 'relative', top: '-1%', width: '94%', left: '3%' }}>
          <div>
            <EnvironmentOutlined />
            地址管理
            <RightOutlined />
          </div>
          <Divider />
          <div>
            <ClockCircleOutlined />
            我的足迹
            <RightOutlined />
          </div>
          <Divider />
          <div>
            <HeartOutlined />
            我的关注
            <RightOutlined />
          </div>
          <Divider />
          <div>
            <StarOutlined />
            我的收藏
            <RightOutlined />
          </div>
          <Divider />
          <div>
            <CommentOutlined />
            我的评价
            <RightOutlined />
          </div>
          <Divider />
        </Card>
      </div>
    </div>
  );

}
export default MallUser;