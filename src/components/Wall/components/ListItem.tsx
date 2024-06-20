import { IPost } from '../../../reactQuery/hooks/post/usePosts';
import Photo from './Avatar';

const ListItem = ({ item }: { item: IPost }) => {
  const { user, createdAt, content, imageUrl } = item;
  return (
    <div className='p-6 itemWrapper'>
      <div className='flex items-center gap-x-3 mb-4'>
        <Photo size='h-11 w-11'>
          {user.photo && <img src={user.photo} alt='' />}
        </Photo>
        <div className='text-left'>
          <h4>{user.name}</h4>
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
