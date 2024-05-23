// import Select from './components/Select';
// import Search from './components/Search';
// import ListItem from './components/ListItem';
// import SideMenu from './components/SideMenu';
// import EmptyList from './components/EmptyList';
import { Outlet } from 'react-router-dom';
import SideMenu from './components/SideMenu';

const WallMain = () => {
    return (
        <div className='grid grid-cols-[3fr_1fr] gap-x-10 container'>
            {/* <div className=''> */}
            <Outlet />
            {/* </div> */}
            <SideMenu />
        </div>
    );
};

export default WallMain;
