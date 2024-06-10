//by ly
import './brandList.css'
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import React, {useContext, useEffect, useState} from 'react';
import {ServiceContext} from "../../../contexts/ServiceContext";
import {LeftOutlined} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

const ProductList = () => {
    const { id } = useParams();

    const { product: productService } = useContext(ServiceContext);
    const [ product, setProduct ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setProduct(productService.getProductList());

    }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

    let items=[];
    let header;
    if(id==="1"){
        items = product.filter(item => item.isSeckill);
        header="秒杀商品列表";
    }
    else{
        items = product.filter(item => item.isRecommend);
        header="推荐商品列表";
    }



    const handleClick = () => {
        navigate(-1); //跳转到上一页
    };
    return (
        // style={{ height: '91vh' }}
        <>
            <Layout>


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
                    {header}
                </Header>
                <Layout>

                    <Content style={{marginTop:"20%", marginRight:"5%",marginLeft:"5%"}}>
                        <div className="menu-container" >
                            {items.map((item, index) => (
                                <div key={index} className="menu-item" onClick={() => navigate('/productDetail/' + item.id)}>
                                    <img src={item.src} alt={item.name} className="menu-item-image" />
                                    <span className="menu-item-name">{item.name.substring(0, 10)+"..."}</span>
                                    <span className="menu-item-price" style={{  fontSize: 17, color: '#c91515' }}>{"￥"+item.price}</span>
                                </div>
                            ))}
                        </div>
                        {/*<Outlet />*/}
                    </Content>

                </Layout>
            </Layout>
        </>
    );
};

export default ProductList