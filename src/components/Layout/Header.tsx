import { Link } from 'react-router-dom';
import Photo from '../Photo';
import Avatar from '../Avatar';
import { useReducer } from 'react';
import useUserStore from '../../stores/useUserStore';

const Header = () => {
  const { isLogin, userInfo, setLogin } = useUserStore();
  const [isMenuOpen, toggleMenu] = useReducer((prev) => !prev, false);

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
      onClick: () => {
        setLogin(false);
        window.sessionStorage.setItem('token', '');
      },
    },
  ];
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
                <div className='alignIcon cursor-pointer' onClick={toggleMenu}>
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
      {isMenuOpen && (
        <div className='relative z-10'>
          <ul className='absolute right-0 -translate-x-1/2 -top-[5px] grid grid-cols-1 divide-y-2 divide-black shadowBorder-r themeBorder'>
            {ACTION_LIST.map(({ title, path, onClick }) => (
              <Link
                className='py-2 px-12 bg-white'
                key={path}
                to={path}
                onClick={() => {
                  toggleMenu();
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
