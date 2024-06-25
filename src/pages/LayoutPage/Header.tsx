import { Link } from 'react-router-dom';
import Photo from '../../components/Photo';
import Avatar from '../../components/Avatar';
import { useState } from 'react';

interface IHeader {
  isAuth: boolean;
  imageUrl?: string;
}

const ACTION_LIST = [
  {
    title: '我的貼文牆',
    path: '/metaWall',
  },
  {
    title: '修改個人資料',
    path: '/metaWall/user/updateInfo',
  },
  {
    title: '登出',
    path: '/metaWall/login',
    onClick: () => window.sessionStorage.setItem('token', ''),
  },
];

const Header = ({ isAuth, imageUrl }: IHeader) => {
  const [openActionList, setOpenActionList] = useState(false);
  return (
    <>
      <header className=' p-2 borderBottom '>
        <div className='container flex justify-between items-center'>
          <Link to='/metaWall' className='font-bold'>
            MetalWall
          </Link>
          <div className='alignIcon'>
            {isAuth ? (
              <div>
                <div
                  className='alignIcon cursor-pointer'
                  onClick={() => setOpenActionList((prev) => !prev)}
                >
                  <Avatar>
                    <Photo imageUrl={imageUrl || ''} />
                  </Avatar>
                  <p className='pb-1 border-b-4 border-b-black '>Member</p>
                </div>
              </div>
            ) : (
              <>
                <Link to='/metaWall/signup'>註冊</Link>
                <Link to='/metaWall/login'>登入</Link>
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
