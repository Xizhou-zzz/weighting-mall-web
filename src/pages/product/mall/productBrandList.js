//by ly
import './brandList.css'
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import React, {useContext, useEffect, useState} from 'react';
import {ServiceContext} from "../../../contexts/ServiceContext";
import {LeftOutlined} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

const ProductBrandList = () => {
    const { id } = useParams();
    const { product: productService } = useContext(ServiceContext);
    const [ product, setProduct ] = useState([]);
    const { brand: brandService } = useContext(ServiceContext);
    const [ brand, setBrand ] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {
        setBrand(brandService.getBrandList());
        setProduct(productService.getProductList());

    }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

    const filteredProducts = product.filter(item => item.brandId ===Number(id));
    const filteredBrand= brand.filter(item => item.id ===Number(id))
    console.log(filteredProducts)
    console.log(filteredBrand);


    const handleClick = () => {
        navigate(-1); //跳转到上一页
    };

    return (
        // style={{ height: '91vh' }}
        <>
            <Layout >


                <LeftOutlined
                    style={{
                        fontSize: '30px',
                        position: 'fixed',
                        top: '5px',  // Adjust as needed
                        zIndex: 10, // Ensure it is above other elements
                        cursor: 'pointer',

                    }}
                    onClick={handleClick}
                />
                <Header style={{ display: 'flex', justifyContent: 'center',color:'black',backgroundColor: 'white', textAlign: 'center', position: 'fixed', width: '100%', padding: 0}} >
                    品牌详情
                </Header>
                <Layout>

                    <Content style={{ marginTop: "20%", marginRight: "5%", marginLeft: "5%" , marginBottom:"5%"}}>

                        {filteredBrand.length > 0 ? (
                            <>
                                <div  style={{ display: 'flex', alignItems: 'center', textAlign: 'left', border: '1px solid #eee',  }}>
                                    <img src={filteredBrand[0].src} alt={filteredBrand[0].name} style={{ width:"50%", height:"50%", objectFit: 'contain', marginRight: '10px' }} />
                                    <div style={{ flex: '1' }}>
                                        <span style={{ fontSize: '17px' }}>{filteredBrand[0].name}</span>
                                    </div>


                                </div>
                                <hr/>
                                <div style={{textAlign: 'center', border: '1px solid #eee', width:"100%" }}>
                                    <span style={{ fontSize: '17px' }}>品牌故事</span>
                                    <br/>
                                    <span style={{ fontSize: '12px', color: '#666' }}>{filteredBrand[0].story}</span>
                                </div>
                            </>

                        ) : (
                            <p style={{textAlign: 'center'}}>无品牌</p>
                        )}

                        <hr/>

                        {filteredProducts.length > 0 ? (
                            <div className="menu-container" >
                                {filteredProducts.map((item, index) => (
                                    <div key={index} className="menu-item"  onClick={() => navigate('/productDetail/' + item.id)}>
                                        <img src={item.src} alt={item.name} className="menu-item-image" />
                                        <span className="menu-item-name">{item.name.substring(0, 10)+"..."}</span>
                                        <span className="menu-item-price" style={{  fontSize: 17, color: '#c91515' }}>{"￥"+item.price}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{textAlign: 'center'}}>无商品</p>
                        )}
                    </Content>

                </Layout>
            </Layout>
        </>
    );
};

export default ProductBrandList