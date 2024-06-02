import React from "react";
import { useEffect, useState, useCallback, useContext } from "react";
import { Button, Space, Table, App } from "antd";

import { ServiceContext } from "../contexts/ServiceContext";
import UserEditModal from "../components/user/UserEditModal";
import UserRoleEditModal from "../components/user/UserRoleEditModal";

const UserPage = () => {
  const { modal } = App.useApp();
  const { user: userService } = useContext(ServiceContext);

  const [ users, setUsers ] = useState([]);
  useEffect(() => {
    setUsers(userService.getUsers());
  }, [/* eslint-disable-line react-hooks/exhaustive-deps */]);
  
  const onRoleClick = useCallback((record) => {
    setEditEntity(record);
    setRoleEditModalOpen(true);
  }, []);

  const onEditClick = useCallback((record) => {
    setEditEntity(record);
    setEditModalOpen(true);
  }, []);

  const onDeleteClick = useCallback((record) => {
    modal.confirm({
      title: '你确定要删除吗？',
      content: '删除后将无法恢复',
      onOk() {
        userService.deleteUser(record.id);
        setUsers(userService.getUsers());
      },
    });
  }, [/* eslint-disable-line react-hooks/exhaustive-deps */]);

  const [editEntity, setEditEntity] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRoleModalOpen, setRoleEditModalOpen] = useState(false);
  const onAddBtnClick =  useCallback(() => {
    setEditEntity({id: -1});
    setEditModalOpen(true);
  }, [])
  const onEditModalCreate = useCallback((values) => {
    setEditModalOpen(false);
    setRoleEditModalOpen(false);
    const user = { ...editEntity, ...values };
    if (values.id === -1) {
      userService.addUser(user);
    } else {
      userService.editUser(user);
    }
    setUsers(userService.getUsers());
  }, [ editEntity, /* eslint-disable-line react-hooks/exhaustive-deps */]);

  const onEditModalCancel = useCallback(() => {
    setEditModalOpen(false);
    setRoleEditModalOpen(false);
  }, []);

  const columns = [
    { title: "编号", dataIndex: "id", key: "id" },
    { title: "账号", dataIndex: "username", key: "username" },
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "邮箱", dataIndex: "email", key: "email" },
    { title: "是否启用", dataIndex: "enable", key: "enable",
      render: (enable) => enable ? "是" : "否"
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => {onRoleClick(record)}}>分配角色</Button>
          <Button type="link" onClick={() => {onEditClick(record)}}>编辑</Button>
          {record.id !== 1 && <Button type="link" onClick={() => {onDeleteClick(record)}}>删除</Button>}
        </Space>
      ),
    },
  ];
  
  return (
    <div className="page">
      <UserEditModal
        open={editModalOpen}
        onCreate={onEditModalCreate}
        onCancel={onEditModalCancel}
        initialValues={editEntity}
      />
      <UserRoleEditModal
        open={editRoleModalOpen}
        onCreate={onEditModalCreate}
        onCancel={onEditModalCancel}
        initialValues={editEntity} 
      />
      <Button type="primary" style={{marginBottom: 20}} onClick={onAddBtnClick}>添加用户</Button>
      <Table rowKey="id" columns={columns} dataSource={users} />
    </div>
  );
};

export default UserPage;
