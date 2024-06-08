import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { LeftOutlined, CheckCircleOutlined, PayCircleOutlined } from '@ant-design/icons';

const SubmitOrder = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const toPay = () => {
        navigate('/pay');
    };

    return (
        <div>
            {/* 第一行：支付成功 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>实付数￥2799</span>
                <Button style={{ height: '40px', backgroundColor: 'red', color: 'white' }} onClick={toPay}>提交订单</Button>
            </div>
            {/* 第二行：返回图标 */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <LeftOutlined style={{ cursor: 'pointer' }} />
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                    <h1 style={{ fontSize: '20px', margin: '0' }}>支付成功</h1>
                </div>
            </div>

            {/* 内容容器 */}
            <div>
                <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '40px' }}>
                    <CheckCircleOutlined style={{ color: 'red', fontSize: '65px' }} />
                </div>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span style={{ fontSize: '15px' }}>支付成功</span>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <Button block style={{ height: '40px', backgroundColor: 'red', color: 'white' }}>
                        查看订单
                    </Button>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <Button block style={{ height: '40px' }} >返回首页</Button>
                </div>

            </div>
        </div>
    );
};

export default SubmitOrder;
