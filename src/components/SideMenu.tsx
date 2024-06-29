import { FaRegThumbsUp, FaRegBell } from 'react-icons/fa';
import Avatar from './Avatar';
import Photo from './Photo';
import { Link } from 'react-router-dom';
import useUser from '../reactQuery/hooks/user/useUser';
const SideMenu = () => {
    const { data } = useUser();

    const list = [
        {
            title: data?.username || '',
            onClick: () => {},
            imageUrl: data?.imageUrl
        },
        {
            title: '追蹤名單',
            onClick: () => {},
            Icon: <FaRegBell />
        },
        {
            title: '我按讚的文章',
            onClick: () => {},
            Icon: <FaRegThumbsUp />
        }
    ];
    return (
        <div className='py-8 px-6 themeBorder bg-white'>
            <Link to='/metaWall/newPost'>
                <button className='w-full bg-navy text-white py-4 rounded-default shadow-button ml-[2.5px] mb-6 active:shadow-none'>
                    張貼動態
                </button>
            </Link>
            <div className='flex flex-col gap-y-22px'>
                {list.map(({ imageUrl, Icon, title, onClick }, index) => (
                    <div
                        className='flex items-center gap-x-4 cursor-pointer'
                        key={index}
                        onClick={onClick}>
                        <Avatar
                            size='w-50px h-50px'
                            borderColorClass='border-navy'
                            backgroundColorClass='bg-babyBlue'
                            textColorClass='text-navy'>
                            {Icon
                                ? Icon
                                : imageUrl && <Photo imageUrl={imageUrl} />}
                        </Avatar>
                        <p>{title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideMenu;
