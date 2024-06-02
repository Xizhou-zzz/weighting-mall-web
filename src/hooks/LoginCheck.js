import { useEffect, useContext } from 'react';
import { App } from 'antd';
import { ServiceContext } from '../contexts/ServiceContext';
import { useNavigate } from 'react-router-dom';

const useLoginCheck = () => {
  // 使用具描述性的命名
  const { userService } = useContext(ServiceContext);
  const { message } = App.useApp();
  const router = useNavigate();

  useEffect(() => {
    // 使用异步函数以清晰地处理异步逻辑
    const checkLoginStatus = async () => {
      try {
        const currentUser = await userService.getCurrentUser();
        if (!currentUser) {
          message.open({
            type: 'warning',
            content: '请先登录',
          });
          router('/login'); // 使用更简洁的导航方式
        }
      } catch (error) {
        console.error('检查登录状态出错: ', error);
      }
    };

    checkLoginStatus(); // 调用异步函数
  }, [userService, message, router]); // 确保依赖项的完整性
};

export default useLoginCheck;