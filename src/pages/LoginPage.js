import React, { useContext } from "react";
import { Alert, App, Button, Checkbox, Form, Input, Space, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../contexts/ServiceContext";


const LoginPage = () => {
  const { message } = App.useApp();
  const { user: userService } = useContext(ServiceContext);
  const navigate = useNavigate();

  const onFinish = (values) => {
    try {
        const user = userService.login(
        values.username,
        values.password,
        values.remember
        );
        if (user) {
            message.open({
                type: "success",
                content: "登录成功",
            });
            setTimeout(() => {
                navigate("/main");
            }, 1000);
        } else {
        message.open({
            type: "error",
            content: "登录失败",
        });
        } 
    } catch (error) {
        console.error("登录出错: ", error);
    }
  };


  return (
    <Form
      name="basic"
      style={{
        marginTop: "25%",
        width: "50%",
        minWidth: 600,
        margin: "50px auto",
        borderRadius: 8,
        padding: 20,
        boxShadow: "0 0 20px #ff5f8c",
        background: "#fff",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Alert message="Weighting-MALL-WEB" type="info" style={{marginBottom: 32, textAlign: "center"}}/>
        <Form.Item
            label="用户名"
            name="username"
            rules={[
            {
                required: true,
                message: "请输入用户名",
            },
            ]}
            style={{marginTop: 32}}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="密码"
            name="password"
            rules={[
            {
                required: true,
                message: "请输入密码",
            },
            ]}
            style={{marginTop: 32}}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
        >
            <Input.Password />
        </Form.Item>
        <Form.Item
            name="remember"
            valuePropName="checked"
        >
            <Row justify="center" style={{marginTop: 32, textAlign: "center"}}>
                <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Row>
        </Form.Item>
        <Form.Item>
            <Row justify="center" style={{marginBottom: 32, textAlign: "center"}}>
                <Space>
                    <Button type="primary" htmlType="submit" style={{background: "#ff5f8c"}}>
                        登录
                    </Button>
                    <Button
                        onClick={() => {
                        navigate("/register");
                        }}
                    >
                        注册
                    </Button>
                </Space>
            </Row>
        </Form.Item>
        <Alert message="管理员admin;密码123456" type="info" style={{marginBottom: 32, textAlign: "center"}}/>
        <Alert message="商品管理员storeKeeper;密码123456" type="info" style={{marginBottom: 32, textAlign: "center"}}/>
        <Alert message="订单管理员order;密码123456" type="info" style={{marginBottom: 32, textAlign: "center"}}/>
    </Form>
  );
};

export default LoginPage;
