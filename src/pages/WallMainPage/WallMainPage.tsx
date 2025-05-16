import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/SideMenu';

const WallMainPage = () => {
  return (
    <div className='grid lg:grid-cols-[3fr_1fr] gap-x-10 container'>
      <div className='mb-16 lg:mb-0'>
        <Outlet />
      </div>
      <SideMenu />
    </div>
  );
};

export default WallMainPage;
