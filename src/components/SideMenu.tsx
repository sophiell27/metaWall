import { FaRegThumbsUp, FaRegBell } from 'react-icons/fa';
import Avatar from './Avatar';
import Photo from './Photo';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import BaseButton from './BaseButton';
import { useTranslation } from 'react-i18next';
import { IoMdAdd } from 'react-icons/io';
import { IoHomeOutline } from 'react-icons/io5';
import {
  disconnectSocket,
  initiateSocketConnection,
  subscribeToLikes,
} from '../services/socket';
import useCachedUser from '../reactQuery/hooks/user/useCachedUser';
import { IUser } from '../types';
const SideMenu = () => {
  const { t } = useTranslation();

  const userInfo: IUser | undefined = useCachedUser();
  useEffect(() => {
    if (userInfo?._id) {
      initiateSocketConnection(userInfo?._id);
      subscribeToLikes((scoketData) => {
        console.log('socketData', scoketData);
        // alert(`Your post was liked by ${scoketData.username}`);
      });
    }
    return () => {
      disconnectSocket();
    };
  }, [userInfo?._id]);

  const list = [
    {
      title_key: userInfo?.username || '',
      onClick: () => {},
      imageUrl: userInfo?.imageUrl,
      Icon: <IoHomeOutline />,
    },
    {
      title_key: 'followList',
      onClick: () => {},
      Icon: <FaRegBell />,
    },
    {
      title_key: 'postLike',
      onClick: () => {},
      Icon: <FaRegThumbsUp />,
    },
  ];
  return (
    <div className='h-16 themeBorder !border-[3px] bg-beige fixed bottom-0 left-10 right-10 rounded-full z-50 flex gap-x-4 flex-row-reverse justify-center items-center lg:flex-col lg:gap-y-22px lg:static lg:justify-start lg:items-start lg:z-0 lg:self-start lg:py-8 lg:px-6 lg:bg-white lg:rounded-none lg:h-auto lg:border-2'>
      <Link to='/newPost' className='hidden lg:w-full lg:mb-6 lg:block'>
        <BaseButton label_key='createPost' />
        <Avatar className='iconSize bg-navy text-black border-black buttonHover lg:hidden'>
          <IoMdAdd className='text-4xl text-black ' />
        </Avatar>
      </Link>
      {list.map(({ imageUrl, Icon, title_key, onClick }, index) => (
        <div
          className='flex items-center gap-x-4 cursor-pointer'
          key={index}
          onClick={onClick}
        >
          <Avatar className='iconWrapper'>
            {imageUrl ? <Photo imageUrl={imageUrl} /> : Icon}
          </Avatar>
          <p className='hidden lg:block'>{t(title_key)}</p>
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
