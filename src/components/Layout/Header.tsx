import { Link } from 'react-router-dom';
import Photo from '../Photo';
import Avatar from '../Avatar';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../../stores/useAuthStore';
import { IUser } from '../../types';
import useCachedUser from '../../reactQuery/hooks/user/useCachedUser';
import { useQueryClient } from '@tanstack/react-query';
import useNotificationStore from '../../stores/useNotificationStore';
import { FaBell } from 'react-icons/fa';
import Dropdown from './Dropdown';
import NotificationItem from '../NotificationItem';

const Header = () => {
  const { isLogin } = useAuthStore();
  const userInfo: IUser | undefined = useCachedUser();
  const { logout } = useAuthStore();
  const { unreadNotifications } = useNotificationStore();
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();
  const MENU_LIST = [
    {
      title_key: 'myWall',
      path: '/',
    },
    {
      title_key: 'updateInfo',
      path: '/user/updateInfo',
    },
    {
      title_key: 'logout',
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
              <>
                <Dropdown
                  trigger={
                    <>
                      <div className='alignIcon cursor-pointer'>
                        <Avatar>
                          <Photo imageUrl={userInfo.imageUrl || ''} />
                        </Avatar>
                        <p className='pb-1 border-b-4 border-b-black '>
                          {userInfo.username}
                        </p>
                      </div>
                    </>
                  }
                >
                  {({ close }) =>
                    MENU_LIST.map(({ title_key, path, onClick }) => (
                      <Link
                        className='py-2 px-12 bg-white buttonHover block'
                        key={path}
                        to={path}
                        onClick={(e) => {
                          e.stopPropagation();
                          close();
                          onClick && onClick();
                        }}
                      >
                        {t(title_key)}
                      </Link>
                    ))
                  }
                </Dropdown>

                <Dropdown
                  trigger={
                    <div className='flex'>
                      <FaBell
                        stroke='black'
                        strokeWidth={50}
                        className={`w-6 h-6  ${
                          unreadNotifications && unreadNotifications.length > 0
                            ? 'text-gold'
                            : 'text-beige'
                        }`}
                      />
                      {unreadNotifications &&
                        unreadNotifications?.length > 0 && (
                          <small className='w-5 h-5 rounded-full bg-red-500 font-bold flex justify-center items-center -ml-3 border-black border-2'>
                            {unreadNotifications?.length}
                          </small>
                        )}
                    </div>
                  }
                >
                  {({ close }) =>
                    unreadNotifications && unreadNotifications.length > 0 ? (
                      unreadNotifications.map(
                        ({ senderId, senderName, postId }, index) => (
                          <div
                            key={index}
                            className='py-2 px-12 bg-white buttonHover block'
                            onClick={(e) => {
                              e.stopPropagation();
                              close();
                            }}
                          >
                            <NotificationItem
                              senderId={senderId}
                              postId={postId}
                              senderName={senderName}
                            />
                          </div>
                        ),
                      )
                    ) : (
                      <p className='cursor-default '>no notification</p>
                    )
                  }
                </Dropdown>
              </>
            ) : (
              <>
                <Link to='/signup'>{t('register')}</Link>
                <Link to='/login'>{t('login')}</Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
