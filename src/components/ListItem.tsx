import { useNavigate } from 'react-router-dom';
import { IPost } from '../types';
import Photo from './Avatar';

const ListItem = ({ item }: { item: IPost }) => {
  const { user, createdAt, content, imageUrl } = item;
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/${user._id}`);
  };
  return (
    <div className='p-6 itemWrapper'>
      <div className='flex items-center gap-x-3 mb-4'>
        <Photo size='h-11 w-11'>
          {user.imageUrl && (
            <img
              src={user.imageUrl}
              alt=''
              className='cursor-pointer'
              onClick={onClick}
            />
          )}
        </Photo>
        <div className='text-left'>
          <h4 className='cursor-pointer' onClick={onClick}>
            {user.username}
          </h4>
          <small>{createdAt.toLocaleString()}</small>
        </div>
      </div>
      <article className='mb-4 text-start'>{content}</article>
      {imageUrl && (
        <img src={imageUrl} alt='post' className='w-full rounded-default' />
      )}
    </div>
  );
};

export default ListItem;
