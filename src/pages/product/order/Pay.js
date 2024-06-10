import React from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';
import { Button, Radio } from 'antd';
import { LeftOutlined, AlipayOutlined, WechatOutlined } from '@ant-design/icons';

/* #1 */
const Pay = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // 从URL中获取price参数
    const searchParams = new URLSearchParams(location.search);
    const price = searchParams.get('price') || '0'; // 如果没有price参数，默认为0

    const toPaymentMethod = () => {
        navigate(`/product/paymentMethod?price=${price}`);
    };
    const handleGoBack = () => {
        navigate(`/product/submitOrder?price=${price}`);
    };
    return (
        <div>
            {/* 头部容器，应用Flexbox布局 */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* 左侧的图标 */}
                <LeftOutlined onClick={handleGoBack} />
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                    <h1 style={{ fontSize: '24px', margin: '0 0 0 8px' }}>支付</h1>
                </div>
            </div>

            {/* 内容容器 */}
            <div>
                <div style={{ textAlign: 'center', fontSize: '15px', marginTop: '30px', color: '#999999' }}>
                    <span>支付金额</span>
                </div>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <span style={{ fontSize: '30px', fontWeight: 'bold' }}>￥{price}</span>
                </div>

                <Radio.Group name="radiogroup" defaultValue={1} style={{ width: '100%' }}>
                    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '20px' }}>
                            <AlipayOutlined style={{ backgroundColor: 'blue', color: 'white', fontSize: '24px', marginRight: '10px' }} />
                            支付宝支付
                        </span>
                        <Radio value={1}></Radio>
                    </div>

                    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '20px' }}>
                            <WechatOutlined style={{ backgroundColor: 'green', color: 'white', fontSize: '24px', marginRight: '10px' }} />
                            微信支付
                        </span>
                        <Radio value={2}></Radio>
                    </div>
                </Radio.Group>
                <div style={{ marginBottom: '10px' }}>
                    <Button block style={{ height: '40px', backgroundColor: 'red', color: 'white' }} onClick={toPaymentMethod}>
                        确认支付
                    </Button>
                </div>

            </div>
        </div >
    );
};

export default Pay;
