import React, { useContext } from "react";
import { App, Button, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../contexts/ServiceContext";

const RegisterPage = () => {
  const { message } = App.useApp();
  const { user: userService } = useContext(ServiceContext);
  const navigate = useNavigate();

  const isPasswordValid = (password) => {
    // 正则表达式，校验密码是否包含大小写字母和数字，且长度在8到16位之间
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
  
    // 使用正则表达式测试密码是否符合要求
    return passwordRegex.test(password);
  };

  const onFinish = (values) => {
    const { username, password, email } = values;

    // 校验密码复杂度
    if (!isPasswordValid(password)) {
        message.open({
        type: "error",
        content: "密码必须包含大小写字母和数字，且长度为8-16位",
        });
        return;
    }

    try {
        const user = userService.register(username, password, email);
        if (user) {
        message.open({
            type: "success",
            content: "注册成功",
        });
        setTimeout(() => {
            navigate("/login");
        }, 1000);
        } else {
        message.open({
            type: "error",
            content: "注册失败",
        });
        }
    } catch (error) {
        console.error("注册出错: ", error);
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
        name="email"
        label="邮箱"
        rules={[
          {
            type: "email",
            message: "请输入有效的邮箱地址",
          },
        ]}
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
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Row justify="center">
            <Button type="primary" htmlType="submit" style={{background: "#ff5f8c"}}>
            注册
            </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default RegisterPage;
