//by ly
import './MallGenreChildren.css'
import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {ServiceContext} from "../../../contexts/ServiceContext";
const MallGenreChildren = () => {

    const { mallGenre: mallGenreService } = useContext(ServiceContext);
    const [ mallGenre, setMallGenre ] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        setMallGenre(mallGenreService.getMallGenre());

    }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

    let location = useLocation();
    const pathParts = location.pathname.split('/');
    const lastPathPart = pathParts[pathParts.length - 1];

    const selectedGenre = mallGenre.find(item => item.frontName === lastPathPart);
    console.log(mallGenre)

    return (
        <div>
            {selectedGenre ? (
                <div className="menu-container" >
                    {selectedGenre.children ? (
                        selectedGenre.children.map((child, index) => (
                            <div key={index} className="menu-item" onClick={() => navigate('/mall/productGenreList/' + child.id)}>
                                <img src={child.src} alt={child.name} className="menu-item-image"  />
                                <span className="menu-item-name" >{child.name}</span>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', width: '100%' }}>没有子项</div>
                    )}
                </div>
            ) : (
                <p>路径 {lastPathPart} 未找到匹配的类别</p>
            )}
        </div>
    );
};

export default MallGenreChildren;