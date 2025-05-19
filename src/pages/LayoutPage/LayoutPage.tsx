import { Outlet } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import WallWrapper from '../../components/WallWrapper';
import useAuthStore from '../../stores/useAuthStore';

const LayoutPage = () => {
  const { isLogin } = useAuthStore();

  return (
    <>
      <Header />
      <WallWrapper classname='pt-12'>{isLogin && <Outlet />}</WallWrapper>
    </>
  );
};
export default LayoutPage;
