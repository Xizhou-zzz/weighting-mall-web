//商城的首页 by ly
import './brandList.css'
import carousel1 from "../../../service/images/carousel1.png"
import carousel2 from "../../../service/images/carousel2.png"
import carousel3 from "../../../service/images/carousel3.png"
import carousel4 from "../../../service/images/carousel4.png"
import { useNavigate } from 'react-router-dom';
import { Layout, Input, Carousel } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { FireTwoTone, LikeTwoTone, RightOutlined, TrophyTwoTone } from "@ant-design/icons";
import { ServiceContext } from "../../../contexts/ServiceContext";
const { Header, Content } = Layout;
const { Search } = Input;

const contentStyle = {
    marginTop: 0,
    height: '170px',
    width: '100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const MallHome = () => {
    const { brand: brandService } = useContext(ServiceContext);
    const [brand, setBrand] = useState([]);

    const { product: productService } = useContext(ServiceContext);
    const [product, setProduct] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setBrand(brandService.getBrandList());
        setProduct(productService.getProductList());

    }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

    const seckillItems = product.filter(item => item.isSeckill);
    const recommendItems = product.filter(item => item.isRecommend);
    const handleBrandListClick = () => {

        navigate("/mall/brandList"); //跳转到相应页面
    };

    const handleSeckillListClick = () => {

        navigate("/mall/productList/1"); //跳转到相应页面

    };

    const handleRecommendListClick = () => {

        navigate("/mall/productList/2"); //跳转到相应页面

    };

    const onSearch = (value, _e, info) => console.log(info?.source, value);
    return (
        <Layout >
            <Header style={{ display: 'flex', justifyContent: 'center', color: 'black', backgroundColor: "#1676fd", height: '5%', textAlign: 'center', position: 'fixed', width: '100%', padding: 0 }} >
                <Search
                    placeholder="input search text"
                    allowClear

                    onSearch={onSearch}
                    style={{
                        marginTop: 5,
                        width: 300,
                    }}
                />
            </Header>
            <Layout>
                <Content style={{ marginTop: "11%", marginLeft: "5%", marginRight: "5%" }}>

                    <Carousel arrows infinite={false} autoplay dotPosition={'top'}>
                        <div>
                            <img src={carousel1} alt="1" style={contentStyle} />

                        </div>
                        <div>
                            <img src={carousel2} alt="2" style={contentStyle} />
                        </div>
                        <div>
                            <img src={carousel3} alt="3" style={contentStyle} />
                        </div>
                        <div>
                            <img src={carousel4} alt="4" style={contentStyle} />
                        </div>
                    </Carousel>
                    <hr></hr>

                    <div style={{ marginTop: "2%", display: 'flex', alignItems: 'center' }} onClick={handleBrandListClick}>
                        <TrophyTwoTone style={{ fontSize: '40px' }} />
                        <p style={{ margin: 0, paddingLeft: '10px', fontSize: 20 }}>品牌制造商直供</p>
                        <RightOutlined style={{ fontSize: '20px', marginLeft: "40%" }} />

                    </div>
                    <br />

                    <div className="menu-container" >
                        {brand.slice(0, 6).map((item, index) => (
                            <div key={index} className="menu-item" onClick={() => navigate('/mall/productBrandList/' + item.id)}>
                                <img src={item.src} alt={item.name} className="menu-item-image" />
                                <span className="menu-item-name">{item.name}</span>
                            </div>
                        ))}
                    </div>

                    <hr></hr>
                    <div style={{ marginTop: "2%", display: 'flex', alignItems: 'center' }} onClick={handleSeckillListClick}>
                        <FireTwoTone style={{ fontSize: '40px' }} />
                        <p style={{ margin: 0, paddingLeft: '10px', fontSize: 20 }}>秒杀专区</p>
                        <RightOutlined style={{ fontSize: '20px', marginLeft: "57%" }} />

                    </div>

                    <br />
                    <div className="menu-container" >
                        {seckillItems.slice(0, 4).map((item, index) => (
                            <div key={index} className="menu-item" onClick={() => navigate('/productDetail/' + item.id)}>
                                <img src={item.src} alt={item.name} className="menu-item-image" />
                                <span className="menu-item-name">{item.name.substring(0, 10) + "..."}</span>
                                <span className="menu-item-price" style={{ fontSize: 17, color: '#c91515' }}>{"￥" + item.price}</span>
                            </div>
                        ))}
                    </div>

                    <hr></hr>
                    <div style={{ marginTop: "2%", display: 'flex', alignItems: 'center' }} onClick={handleRecommendListClick}>
                        <LikeTwoTone style={{ fontSize: '40px' }} />
                        <p style={{ margin: 0, paddingLeft: '10px', fontSize: 20 }}>人气推荐</p>
                        <RightOutlined style={{ fontSize: '20px', marginLeft: "57%" }} />

                    </div>

                    <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {recommendItems.slice(0, 3).map((item, index) => (
                            <div key={index} className="product-item" style={{ display: 'flex', alignItems: 'center', textAlign: 'left', border: '1px solid #eee' }} onClick={() => navigate('/productDetail/' + item.id)}>
                                <img src={item.src} alt={item.name} style={{ width: '150px', height: '150px', objectFit: 'contain', marginRight: '10px' }} />
                                <div style={{ flex: '1' }}>
                                    <span style={{ fontSize: '15px', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>{item.name.substring(0, 15)}</span>
                                    <span style={{ fontSize: '12px', color: '#666' }}>{item.title.substring(0, 50)}...</span>
                                    <span style={{ fontSize: '15px', color: 'red', marginTop: '5px', display: 'block' }}>¥ {item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>



                    {/*<Outlet />*/}
                </Content>
            </Layout>


        </Layout>
    );
};

export default MallHome;