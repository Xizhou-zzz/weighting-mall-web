import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const OrderEditModal = ({ open, onCreate, onCancel, initialValues }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            open={open}
            title={initialValues ? '编辑订单' : '添加订单'}
            okText="保存"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={initialValues}
            >
                <Form.Item
                    name="productName"
                    label="商品名称"
                    rules={[{ required: true, message: 'Please input the product name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="customerName"
                    label="顾客用户名"
                    rules={[{ required: true, message: 'Please input the customer name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="数量"
                    rules={[{ required: true, message: 'Please input the amount!' }]}
                >
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="状态"
                    rules={[{ required: true, message: 'Please input the status!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OrderEditModal;