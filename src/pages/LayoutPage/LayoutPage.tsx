import { Outlet } from 'react-router-dom';
import Header from './Header';
import WallWrapper from '../../components/WallWrapper';

const LayoutPage = () => {
  return (
    <>
      <Header />
      <WallWrapper classname='pt-12'>
        <Outlet />
      </WallWrapper>
    </>
  );
};
export default LayoutPage;
