import { Link } from 'react-router-dom';
import Photo from '../../components/Photo';
import Avatar from '../../components/Avatar';
import { useState } from 'react';
import useUserStore from '../../stores/useUserStore';

const ACTION_LIST = [
  {
    title: '我的貼文牆',
    path: '/',
  },
  {
    title: '修改個人資料',
    path: '/user/updateInfo',
  },
  {
    title: '登出',
    path: '/login',
    onClick: () => window.sessionStorage.setItem('token', ''),
  },
];

const Header = () => {
  const { isLogin, userInfo } = useUserStore();
  const [openActionList, setOpenActionList] = useState(false);
  return (
    <>
      <header className=' p-2 borderBottom '>
        <div className='container flex justify-between items-center'>
          <Link to='/' className='font-bold'>
            MetalWall
          </Link>
          <div className='alignIcon'>
            {isLogin && userInfo ? (
              <div>
                <div
                  className='alignIcon cursor-pointer'
                  onClick={() => setOpenActionList((prev) => !prev)}
                >
                  <Avatar>
                    <Photo imageUrl={userInfo?.imageUrl || ''} />
                  </Avatar>
                  <p className='pb-1 border-b-4 border-b-black '>
                    {userInfo?.username}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <Link to='/signup'>註冊</Link>
                <Link to='/login'>登入</Link>
              </>
            )}
          </div>
        </div>
      </header>
      {openActionList && (
        <div className='relative z-10'>
          <ul className='absolute right-0 -translate-x-1/2 -top-[5px] grid grid-cols-1 divide-y-2 divide-black shadowBorder-r themeBorder'>
            {ACTION_LIST.map(({ title, path, onClick }) => (
              <Link
                className='py-2 px-12 bg-white'
                key={path}
                to={path}
                onClick={() => {
                  setOpenActionList(false);
                  onClick && onClick();
                }}
              >
                {title}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
