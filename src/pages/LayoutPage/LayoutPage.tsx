import { Outlet } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import WallWrapper from '../../components/WallWrapper';
import { isTokenExpired } from './util';
import { useEffect } from 'react';
import useUserStore from '../../stores/useUserStore';

const LayoutPage = () => {
  const { setLogin, isLogin } = useUserStore();
  useEffect(() => {
    const checkAuth = () => {
      const token = window.sessionStorage.getItem('token');
      if (token) {
        const isExpired = isTokenExpired(token);
        if (!isExpired) {
          setLogin(true);
        }
      }
    };
    checkAuth();
  }, [setLogin]);
  return (
    <>
      <Header />
      <WallWrapper classname='pt-12'>{isLogin && <Outlet />}</WallWrapper>
    </>
  );
};
export default LayoutPage;
