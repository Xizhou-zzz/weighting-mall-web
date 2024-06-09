import React, { createContext, useMemo } from 'react';
import UserService from '../service/UserService';
import MenuService from '../service/MenuService';
import RoleService from '../service/RoleService';
import OrderService from '../service/OrderService';

// 创建一个上下文对象
const ServiceContext = createContext();

// 服务提供者组件
const ServiceProvider = ({ children }) => {
  // 使用useMemo来缓存服务对象，避免重复创建
  const service = useMemo(() => {
    return {
      user: new UserService(),
      menu: new MenuService(),
      role: new RoleService(),
      order: new OrderService(),
    }
  }, []);

  // 将服务对象通过上下文提供给子组件
  return (
    <ServiceContext.Provider value={service}>
      {children}
    </ServiceContext.Provider>
  );
};

export { ServiceContext, ServiceProvider };