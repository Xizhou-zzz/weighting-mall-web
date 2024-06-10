//商城的分类 //by ly
import { Outlet ,useNavigate} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import React, {useContext, useEffect, useState} from 'react';
import {ServiceContext} from "../../../contexts/ServiceContext";
const { Header, Content, Footer, Sider } = Layout;

const MallGenre = () => {

    const { mallGenre: mallGenreService } = useContext(ServiceContext);

    const [ mallGenre, setMallGenre ] = useState([]);


    const navigate = useNavigate();

    useEffect(() => {
        setMallGenre(mallGenreService.getMallGenre());

    }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

    // console.log(mallGenre);

    const menuItem = mallGenre.map(item => ({
        key: item.frontName,
        label: item.name,
    }));

    // console.log(menuItem);



    const handleMenuClick = (e) => {
        console.log(e);
        navigate(e.key); //跳转到相应页面

    };
    return (
        <>
            <Layout style={{ height: '91vh' }}>
                    <Header style={{ display: 'flex', justifyContent: 'center',color:'black',backgroundColor: 'white'}} >
                           分类
                    </Header>
                    <Layout>
                            <Sider width="28%">
                                    <Menu mode="inline" style={{ height: '100%', borderRight: 0 }} items={menuItem} onClick={handleMenuClick} />
                            </Sider>
                            <Layout>
                                    <Content style={{ margin: 15}}>
                                            <Outlet />
                                    </Content>
                            </Layout>
                    </Layout>
            </Layout>
        </>
    );
};

export default MallGenre;