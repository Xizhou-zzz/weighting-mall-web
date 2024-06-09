import React, { useEffect, useState, useContext } from 'react';
import { Button, Space, Table, Input } from 'antd';
import { ServiceContext } from '../contexts/ServiceContext';
import OrderEditModal from '../components/order/OrderEditModal';

const OrderPage = () => {
    const { order } = useContext(ServiceContext);

    const [orders, setOrders] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editEntity, setEditEntity] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setOrders(order.getOrders());
    }, [order]);

    const onAddBtnClick = () => {
        setEditEntity(null);
        setEditModalOpen(true);
    };

    const onEditModalCreate = (values) => {
        if (editEntity) {
            order.updateOrder({ ...editEntity, ...values });
        } else {
            order.addOrder({ ...values, id: orders.length ? orders[orders.length - 1].id + 1 : 1 });
        }
        setOrders(order.getOrders());
        setEditModalOpen(false);
    };

    const onEditModalCancel = () => {
        setEditModalOpen(false);
    };

    const onDelete = (id) => {
        order.deleteOrder(id);
        setOrders(order.getOrders());
    };

    const columns = [
        {
            title: '商品名',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: '顾客用户名',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: '数量',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '操作',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => { setEditEntity(record); setEditModalOpen(true); }}>编辑</Button>
                    <Button onClick={() => onDelete(record.id)}>删除</Button>
                </Space>
            ),
        },
    ];

    const filteredOrders = orders.filter(order => 
        order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(order.amount).includes(searchTerm) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Input 
                placeholder="查询订单"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: 20 }}
            />
            <Button type="primary" style={{ marginBottom: 20 }} onClick={onAddBtnClick}>
                添加订单
            </Button>
            <Table rowKey="id" columns={columns} dataSource={filteredOrders} />
            <OrderEditModal
                open={editModalOpen}
                onCreate={onEditModalCreate}
                onCancel={onEditModalCancel}
                initialValues={editEntity}
            />
        </div>
    );
};

export default OrderPage;