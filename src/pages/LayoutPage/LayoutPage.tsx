import { Outlet } from 'react-router-dom';
import Header from './Header';
import WallWrapper from '../../components/WallWrapper';
import { isTokenExpired } from './util';
import { useEffect } from 'react';
import useUserStore from '../../store/userStore';

const LayoutPage = () => {
  const { setIsLogin, isLogin } = useUserStore();

  useEffect(() => {
    const checkAuth = () => {
      const token = window.sessionStorage.getItem('token');
      if (token) {
        const isExpired = isTokenExpired(token);
        if (!isExpired) {
          setIsLogin(true);
        }
      }
    };
    checkAuth();
  }, [setIsLogin]);
  return (
    <>
      <Header />
      <WallWrapper classname='pt-12'>{isLogin && <Outlet />}</WallWrapper>
    </>
  );
};
export default LayoutPage;
