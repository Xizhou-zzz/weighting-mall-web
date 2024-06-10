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
        localStorage.clear();
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

    const handleShip = (id) => {
        order.handleShip(id);
        const updatedOrders = orders.map(order => {
            if (order.id === id) {
                return { ...order, status: 1 };
            }
            return order;
        });
        setOrders(updatedOrders);
    }

    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '订单编号',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: '商品名',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: '产品厂商',
            dataIndex: 'storeName',
            key: 'storeName',
        },
        {
            title: '顾客用户名',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: '金额',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '数量',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: '商品图片',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} alt="商品图片" style={{ width: '50px', height: '50px' }} />,
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (status === 1 ? '已发货' : '未发货'),
        },
        {
            title: '操作',
            key: 'actions',
            render: (_, record) => {
                if (record.status ===  0) {
                    return (
                        <Space size="middle">
                            <Button type="primary" onClick={() => handleShip(record.id)}>点击发货</Button>
                            <Button onClick={() => onDelete(record.id)}>删除</Button>
                        </Space>
                    );
                } else if (record.status ===  1) {
                    return (
                        <Space size="middle">
                            <Button disabled>完成发货</Button>
                            <Button onClick={() => onDelete(record.id)}>删除</Button>
                        </Space>
                    );
                }
            }
        },
    ];

    const filteredOrders = orders.filter(order => 
        order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
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