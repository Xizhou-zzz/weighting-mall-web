//by ly
import './brandList.css'
import { useNavigate, useParams} from 'react-router-dom';
import { Layout } from 'antd';
import React, {useContext, useEffect, useState} from 'react';
import {ServiceContext} from "../../../contexts/ServiceContext";
import {LeftOutlined} from "@ant-design/icons";
const { Header, Content } = Layout;

const ProductGenreList = () => {
    const { id } = useParams();
    const { product: productService } = useContext(ServiceContext);
    const [ product, setProduct ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setProduct(productService.getProductList());

    }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

    const filteredProducts = product.filter(item => item.genreId ===Number(id));


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
                    商品列表
                </Header>
                <Layout>



                    <Content style={{ marginTop: "20%", marginRight: "5%", marginLeft: "5%" }}>
                        {filteredProducts.length > 0 ? (
                            <div className="menu-container" >
                                {filteredProducts.map((item, index) => (
                                    <div key={index} className="menu-item" onClick={() => navigate('/productDetail/' + item.id)}>
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

export default ProductGenreList