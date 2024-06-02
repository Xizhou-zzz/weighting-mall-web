import React from "react";
import { useEffect, useState, useCallback, useContext } from "react";
import { App, Button, Space, Table } from "antd";

import { ServiceContext } from "../contexts/ServiceContext";
import RoleEditModal from "../components/role/RoleEditModal";
import RoleMenuEditModal from "../components/role/RoleMenuEditModal";

const RolePage = () => {
  const { modal } = App.useApp();
  const { role: roleService } = useContext(ServiceContext);

  const [ roles, setRoles ] = useState([]);
  useEffect(() => {
    setRoles(roleService.getRoles());
  }, [ /* eslint-disable-line react-hooks/exhaustive-deps */ ]);

  const onEditClick = useCallback((record) => {
    setEditEntity(record);
    setEditModalOpen(true);
  }, []);

  const onEditMenuClick = useCallback((record) => {
    setEditEntity(record);
    setEditMenuModalOpen(true);
  }, []);

  const onDeleteClick = useCallback((record) => {
    modal.confirm({
      title: '你确定要删除吗？',
      content: '删除后将无法恢复',
      onOk() {
        roleService.deleteRole(record.id);
        setRoles(roleService.getRoles());
      },
    });
  }, [ /* eslint-disable-line react-hooks/exhaustive-deps */ ]);

  const [editEntity, setEditEntity] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editMenuModalOpen, setEditMenuModalOpen] = useState(false);
  const onAddBtnClick = useCallback(() => {
    setEditEntity({id: -1});
    setEditModalOpen(true);
  }, []);
  const onEditModalCreate = useCallback((values) => {
    setEditModalOpen(false);
    setEditMenuModalOpen(false);
    const role = { ...editEntity, ...values };
    if (values.id === -1) {
      roleService.addRole(role);
    } else {
      roleService.editRole(role);
    }
    setRoles(roleService.getRoles());
  }, [ editEntity /* eslint-disable-line react-hooks/exhaustive-deps */ ]);

  const onEditModalCancel = useCallback(() => {
    setEditModalOpen(false);
    setEditMenuModalOpen(false);
  }, []);

  const columns = [
    { title: "编号", dataIndex: "id", key: "id" },
    { title: "角色名称", dataIndex: "name", key: "name" },
    { title: "描述", dataIndex: "desc", key: "desc" },
    {
      title: '用户数量',
      dataIndex: 'userCount',
      key: 'userCount',
      render: (_, record) => roleService.getRoleUserCount(record.id),
    },
    { title: "是否启用", dataIndex: "enable", key: "enable",
      render: (enable) => enable ? "是" : "否"
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => {onEditMenuClick(record)}}>分配菜单</Button> 
          <Button type="link" onClick={() => {onEditClick(record)}}>编辑</Button>
          {record.id !== 1 && <Button type="link" onClick={() => {onDeleteClick(record)}}>删除</Button>}
        </Space>
      ),
    },
  ];
  
  return (
    <div className="page">
      <RoleEditModal
        open={editModalOpen}
        onCreate={onEditModalCreate}
        onCancel={onEditModalCancel}
        initialValues={editEntity}
      />
      <RoleMenuEditModal
        open={editMenuModalOpen}
        onCreate={onEditModalCreate}
        onCancel={onEditModalCancel}
        initialValues={editEntity}
      />
      <Button type="primary" style={{marginBottom: 20}} onClick={onAddBtnClick}>添加角色</Button>
      <Table rowKey="id" columns={columns} dataSource={roles} />
    </div>
  );
};

export default RolePage;
