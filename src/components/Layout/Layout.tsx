import { Outlet } from 'react-router-dom';
import Header from './Header';
import WallWrapper from './WallWrapper';

const Layout = () => {
  return (
    <>
      <Header />
      <WallWrapper>
        <Outlet />
      </WallWrapper>
    </>
  );
};
export default Layout;
