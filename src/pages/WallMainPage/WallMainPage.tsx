import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/SideMenu';

const WallMainPage = () => {
  return (
    <div className='grid grid-cols-[3fr_1fr] gap-x-10 container'>
      <Outlet />
      <SideMenu />
    </div>
  );
};

export default WallMainPage;
