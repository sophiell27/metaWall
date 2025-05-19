import { Link } from 'react-router-dom';
import Photo from '../Photo';
import Avatar from '../Avatar';
import { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../stores/useAuthStore';
import { IUser } from '../../types';
import useCachedUser from '../../reactQuery/hooks/user/useCachedUser';
import { useQueryClient } from '@tanstack/react-query';

const Header = () => {
  const { isLogin } = useAuthStore();
  const userInfo: IUser | undefined = useCachedUser();
  const { logout } = useAuthStore();
  const menuRef = useRef<HTMLUListElement | null>(null);
  const { setIsOpen, isOpen } = useClickOutside(menuRef);
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const ACTION_LIST = [
    {
      title: t('myWall'),
      path: '/',
    },
    {
      title: t('updateInfo'),
      path: '/user/updateInfo',
    },
    {
      title: t('logout'),
      path: '/login',
      onClick: () => {
        logout();
        queryClient.removeQueries({ queryKey: ['user'] });
      },
    },
  ];

  const currentLanguage = i18n.language;

  const languageList = [
    {
      name: 'ENG',
      onClick: () => {
        i18n.changeLanguage('en');
      },
      disabled: currentLanguage === 'en',
    },
    {
      name: '中文',
      onClick: () => {
        i18n.changeLanguage('zh-TW');
      },
      disabled: currentLanguage === 'zh',
    },
  ];

  return (
    <>
      <header className='py-2 borderBottom'>
        <div className='container flex justify-between items-center'>
          <div className='flex gap-x-2'>
            <Link to='/' className='font-bold'>
              MetalWall
            </Link>
            {languageList.map(({ name, onClick, disabled }) => (
              <button
                key={name}
                onClick={onClick}
                className='cursor-pointer text-sm text-navy hover:text-gray-400 disabled:text-gray-400 disabled:cursor-default'
                disabled={disabled}
              >
                {name}
              </button>
            ))}
          </div>
          <div className='alignIcon'>
            {isLogin && userInfo ? (
              <div>
                <div
                  className='alignIcon cursor-pointer'
                  onClick={() => setIsOpen(true)}
                >
                  <Avatar>
                    <Photo imageUrl={userInfo.imageUrl || ''} />
                  </Avatar>
                  <p className='pb-1 border-b-4 border-b-black '>
                    {userInfo.username}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <Link to='/signup'>{t('register')}</Link>
                <Link to='/login'>{t('login')}</Link>
              </>
            )}
          </div>
        </div>
        {isOpen && (
          <div className='relative z-10 container'>
            <ul
              ref={menuRef}
              className='absolute right-4 top-1 grid grid-cols-1 divide-y-2 divide-black shadowBorder-r themeBorder'
            >
              {ACTION_LIST.map(({ title, path, onClick }) => (
                <Link
                  className='py-2 px-12 bg-white buttonHover'
                  key={path}
                  to={path}
                  onClick={() => {
                    setIsOpen(false);
                    onClick && onClick();
                  }}
                >
                  {title}
                </Link>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
