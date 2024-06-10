//by ly
import './brandList.css'
import { Outlet ,useNavigate} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import React, {useContext, useEffect, useState} from 'react';
import {ServiceContext} from "../../../contexts/ServiceContext";
import {LeftOutlined} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

const BrandList = () => {
    const { brand: brandService } = useContext(ServiceContext);
    const [ brand, setBrand ] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        setBrand(brandService.getBrandList());

    }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

    // console.log(brand);

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
                    推荐品牌列表
                </Header>
                <Layout>

                    <Content style={{marginTop:"20%", marginRight:"5%",marginLeft:"5%"}}>
                        <div className="menu-container"  >
                            {brand.map((item, index) => (

                                <div key={index} className="menu-item" onClick={() => navigate('/mall/productBrandList/' + item.id)}>
                                    <img src={item.src} alt={item.name} className="menu-item-image"  />
                                    <span className="menu-item-name"  >{item.name}</span>
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

export default BrandList;