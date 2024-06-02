import React from "react";
import { useEffect, useState, useCallback, useContext } from "react";
import { Button, Space, Table, App } from "antd";

import { ServiceContext } from "../contexts/ServiceContext";
import MenuEditModal from "../components/menu/MenuEditModal";

const MenuPage = () => {
  const { modal } = App.useApp();
  const { menu: menuService } = useContext(ServiceContext);

  const [ menus, setMenus ] = useState([]);
  useEffect(() => {
    setMenus(menuService.getMenus());
  }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

  const onEditClick = useCallback((record) => {
    setEditEntity(record);
    setEditModalOpen(true);
  }, []);

  const onDeleteClick = useCallback((record) => {
    modal.confirm({
      title: '你确定要删除吗？',
      content: '删除后将无法恢复',
      onOk() {
        menuService.deleteMenu(record.id);
        setMenus(menuService.getMenus());
      },
    });
  }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

  const [editEntity, setEditEntity] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const onAddBtnClick = useCallback(() => {
    setEditEntity({id: -1});
    setEditModalOpen(true);
  }, [])
  const onEditModalCreate = useCallback((values) => {
    setEditModalOpen(false);
    if (values.id === -1) {
      menuService.addMenu(values);
    } else {
      menuService.editMenu(values);
    }
    setMenus(menuService.getMenus());
  }, [ editEntity, /* eslint-disable-line react-hooks/exhaustive-deps */]);

  const onEditModalCancel = useCallback(() => {
    setEditModalOpen(false);
  }, []);

  const columns = [
    { title: "编号", dataIndex: "id", key: "id" },
    { title: "菜单", dataIndex: "name", key: "name" },
    { title: "父级", dataIndex: "parent", key: "parent",
      render: (parent) => parent ? parent : "<无>"
    },
    { title: "路径", dataIndex: "path", key: "path" },
    { title: "是否启用", dataIndex: "enable", key: "enable",
      render: (enable) => enable ? "是" : "否"
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          { record.locked || record.path === 'home' ? null : <>
            <Button type="link" onClick={() => {onEditClick(record)}}>编辑</Button>
            <Button type="link" onClick={() => {onDeleteClick(record)}}>删除</Button>
          </> }
        </Space>
      ),
    },
  ];
  
  return (
    <div className="page">
      <MenuEditModal
        open={editModalOpen}
        onCreate={onEditModalCreate}
        onCancel={onEditModalCancel}
        initialValues={editEntity}
      />
      <Button type="primary" style={{marginBottom: 20}} onClick={onAddBtnClick}>添加菜单</Button>
      <Table rowKey="id" columns={columns} dataSource={menus} />
    </div>
  );
};

export default MenuPage;
