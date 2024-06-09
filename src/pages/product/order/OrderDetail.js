import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import { TruckOutlined, EnvironmentFilled, ArrowLeftOutlined } from '@ant-design/icons';

const CreateOrderContainer = styled.div`
  background-color: #f7f7f8;
  padding: 12px 11px 80px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 20px;
`;


const OrderMsgPanel = styled.div`
  display: flex;
  padding: 15px 0 14px 11px;
  align-items: center;
  background-color: #9BABD9;
  border-radius: 5px;
  margin-bottom: 10px;


  .login {
    width: 30px;
    height: 30px;
    //background-image: linear-gradient(90deg, #fcba08 5%, #e59d09 100%);
    border-radius: 15px;
    margin-right: 12px;
    text-align: center;
    line-height: 30px;
  }

  .icon-location {
    font-size: 16px;
    color: #fff;
  }

  .usr {
    flex: 1;
  }

  .top h5 {
    width: 100px;
    font-size: 20px;
    color: white;
    font-weight:550;
  }

  .top span {
    font-size: 20px;
    color: #333;
  }

  .bottom span {
    font-size: 15px;
    color: #333;
    margin-top: 10px;
  }

  .more {
    width: 44px;
    height: 44px;
    text-align: center;
    line-height: 44px;
  }

  .icon-more {
    font-size: 10px;
    color: #808080;
  }
`;

const UserMsgPanel = styled.div`
  display: flex;
  padding: 15px 0 14px 11px;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;

  .login {
    width: 30px;
    height: 30px;
    background-image: linear-gradient(90deg, #fcba08 5%, #e59d09 100%);
    border-radius: 15px;
    margin-right: 12px;
    text-align: center;
    line-height: 30px;
  }

  .icon-location {
    font-size: 16px;
    color: #fff;
  }

  .usr {
    flex: 1;
  }

  .top h5 {
    width: 100px;
    font-size: 20px;
    color: #262626;
  }

  .top span {
    font-size: 20px;
    color: #333;
  }

  .bottom span {
    font-size: 15px;
    color: #333;
    margin-top: 10px;
  }

  .more {
    width: 44px;
    height: 44px;
    text-align: center;
    line-height: 44px;
  }

  .icon-more {
    font-size: 10px;
    color: #808080;
  }
`;

const GoodsPanel = styled.div`
  display: flex;
  align-items: center;
  padding: 11px 0 11px 11px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;

  .pic {
    width: 85px;
    height: 85px;
    margin-right: 12px;

    img {
      width: 100%;
      vertical-align: middle;
    }
  }

  .info {
    flex: 1;

    .top {
      font-size: 16px;
      color: #262626;
    }

    .center {
      width: 88px;
      height: 11px;
      //background-color: #f7f7f8;
      margin-top: 7px;
      color: #888;
      font-size: 12px;
    }

    .bottom {
      margin-top: 13px;

      .red {
        color: #cf4444;

        i {
          font-size: 20px;
          font-style: normal;
        }
      }

      del {
        font-size: 9px;
        color: #999;
      }
    }
  }

  .count {
    width: 44px;
    height: 44px;
    text-align: center;
    line-height: 44px;

    span {
      font-size: 16px;
      color: #262626;

      i {
        margin-left: 5px;
        font-size: 15px;
        color: #262626;
        font-style: normal;
      }
    }
  }
`;

const RestPanel = styled.div`
  padding: 14px 15px 5px 13px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;

  .common_rest {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #262626;
    margin-bottom: 10px;
    align-items: center;
    font-weight: 300;

    h5 {
      font-weight: 400;
      font-size: 16px;
    }

    .red {
      color: #cf4444;

      i {
        font-size: 20px;
        font-style: normal;
      }
    }

    del {
      font-size: 9px;
      color: #999;
    }
  }
  }
`;

const PricePanel = styled.div`
  padding: 14px 15px 16px 13px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  

  .common_rest {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #262626;
    margin-bottom: 0px;
    align-items: center;

    h5 {
      font-weight: 400;
      font-size: 16px;
    }

    .red {
      color: #cf4444;

      i {
        font-size: 20px;
        font-style: normal;
      }
    }

    del {
      font-size: 9px;
      color: #999;
    }
  }
  }
`;

const PayPanel = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 0;
  bottom: 0;
  width: 95%;
  height: 80px;
  background-color: #fff;
  border-top: 1px solid #ededed;
  padding: 0 10px;

  .red {
    color: #cf4444;

    i {
      font-size: 20px;
      font-style: normal;
    }
  }

  del {
    font-size: 9px;
    color: #999;
  }
}

  .left span {
    font-size: 11px;
    

    i {
      font-size: 20px;
      font-style: normal;
    }

    
  }

  .right a {
    display: block;
    width: 100px;
    height: 40px;
    background-image: linear-gradient(90deg, #6fc2aa 5%, #54b196 100%);
    border: none;
    border-radius: 3px;
    color: #fff;
    font-size: 15px;
    text-align: center;
    align-items: center;
    line-height: 35px;
    text-decoration: none;
    

  }
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100px;
  height: 40px;
  background-image: linear-gradient(90deg, #fcba08 5%, #e59d09 100%);
  border: none;
  border-radius: 3px;
  color: #fff;
  font-size: 15px;
  text-align: center;
  line-height: 40px; /* 调整 line-height 使文本垂直居中 */
  text-decoration: none;
`;

const OrderDetailPage = () => {
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const productInfo = searchParams.get("productInfo");

        if (productInfo) {
            const parsedProductInfo = JSON.parse(decodeURIComponent(productInfo));
            // console.log(parsedProductInfo);
            setProduct(parsedProductInfo.product);
            setSelectedColor(parsedProductInfo.selectedColor.target.value);
        }
    }, [location.search]);

    if (!product) {
        return null;
    }

    const handleBack = () => {
        // 返回上一页
        window.history.back();
    };

    return (
        <>
            <CreateOrderContainer>
                <Header>
                    <ArrowLeftOutlined style={{ fontSize: "24px", cursor: "pointer" }} onClick={handleBack} />
                    <Title>订单详情</Title>
                    <div style={{ width: "24px" }}></div>
                </Header>
                <OrderMsgPanel>
                    <div className="login">
                        <span><TruckOutlined style={{ color: "white", fontSize: "25px" }} /></span>
                    </div>
                    <div className="usr">
                        <div className="top">
                            <h5>等待发货</h5>

                        </div>

                    </div>

                </OrderMsgPanel>
                <UserMsgPanel>
                    <div className="login">
                        <span><EnvironmentFilled style={{ color: "white" }} /></span>
                    </div>
                    <div className="usr">
                        <div className="top">
                            <span>aaa</span>
                            <br></br>
                            <span>12345678910</span>
                        </div>
                        <div className="bottom">
                            <span>天堂</span>
                        </div>
                    </div>

                </UserMsgPanel>

                <GoodsPanel>
                    <div className="pic">
                        <a href="#">
                            <img src={product.images[selectedColor]} alt="商品图片" />
                            {/* <img src="https://picture.gptkong.com/20240609/21538fd7470cc14ab8b22cd7718499ab5e.jpg" alt="商品图片" /> */}
                        </a>
                    </div>
                    <div className="info">
                        <div className="top">{product.name}</div>
                        <div className="center">{selectedColor}</div>
                        <div className="bottom">
                            <span className="red"><i>{product.price}</i></span>
                            <del>{product.originalPrice}</del>
                        </div>
                    </div>
                    <div className="count">
                        {/* <span>x<i>{product.quantity}</i></span> */}
                        <span>x 1</span>
                    </div>
                </GoodsPanel>

                <RestPanel>
                    <div className="common_rest">
                        <h5>总优惠</h5>
                        <span className="red">-￥1100</span>
                    </div>
                    <div className="common_rest">
                        <h5>配送方式</h5>
                        <span>顺丰快递</span>
                    </div>
                    <div className="common_rest">
                        <h5>订单编号</h5>
                        <span>23432924315890923832</span>
                    </div>
                    <div className="common_rest">
                        <h5>提交时间</h5>
                        <span>2024-6-1 13:28:00</span>
                    </div>
                    <div className="common_rest">
                        <h5>支付方式</h5>
                        <span>支付宝支付</span>
                    </div>
                </RestPanel>

                <PricePanel>
                    <div className="common_rest">
                        <h5>商品总计</h5>
                        <span className="red"><i>{product.price}</i></span>
                    </div>
                </PricePanel>
            </CreateOrderContainer>


        </>
    );
};

export default OrderDetailPage;
