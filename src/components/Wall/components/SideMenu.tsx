import { FaRegThumbsUp, FaRegBell } from 'react-icons/fa';
import Avatar from './Avatar';
import Photo from './Photo';
const SideMenu = () => {
    const list = [
        {
            title: 'user',
            onClick: () => {},
            imageUrl: ''
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
            <button className='w-full bg-navy text-white py-4 rounded-default shadow-button mb-6'>
                張貼動態
            </button>
            <div className='flex flex-col gap-y-22'>
                {list.map(({ imageUrl, Icon, title }, index) => (
                    <div className='flex items-center gap-x-4' key={index}>
                        <Avatar
                            size='w-50 h-50'
                            borderColorClass='border-navy'
                            backgroundColorClass='bg-babyBlue'
                            textColorClass='text-navy'
                            >
                            {Icon ? Icon : <Photo imageUrl={imageUrl} />}
                        </Avatar>
                        <p>{title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideMenu;
