import { FaRegThumbsUp, FaRegBell } from 'react-icons/fa';
import Avatar from './Avatar';
import Photo from './Photo';
import { Link } from 'react-router-dom';
import useUser from '../reactQuery/hooks/user/useUser';
import useUserStore from '../stores/useUserStore';
import { useEffect } from 'react';
import BaseButton from './BaseButton';
import { useTranslation } from 'react-i18next';
const SideMenu = () => {
  const { t } = useTranslation();
  const { setUserInfo } = useUserStore();
  const { data } = useUser();
  useEffect(() => {
    setUserInfo(data);
  }, [data, setUserInfo]);

  const list = [
    {
      title_key: data?.username || '',
      onClick: () => {},
      imageUrl: data?.imageUrl,
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
    <div className='py-8 px-6 themeBorder bg-white'>
      <Link to='/newPost'>
        <BaseButton label_key='createPost' classname='mb-6' />
      </Link>
      <div className='flex flex-col gap-y-22px'>
        {list.map(({ imageUrl, Icon, title_key, onClick }, index) => (
          <div
            className='flex items-center gap-x-4 cursor-pointer'
            key={index}
            onClick={onClick}
          >
            <Avatar
              size='w-50px h-50px'
              borderColorClass='border-navy'
              backgroundColorClass='bg-babyBlue'
              textColorClass='text-navy'
            >
              {Icon ? Icon : imageUrl && <Photo imageUrl={imageUrl} />}
            </Avatar>
            <p>{t(title_key)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
