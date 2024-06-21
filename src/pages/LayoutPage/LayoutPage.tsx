import { Outlet } from 'react-router-dom';
import Header from './Header';
import WallWrapper from '../../components/WallWrapper';

const LayoutPage = () => {
  return (
    <>
      <Header />
      <WallWrapper>
        <Outlet />
      </WallWrapper>
    </>
  );
};
export default LayoutPage;
