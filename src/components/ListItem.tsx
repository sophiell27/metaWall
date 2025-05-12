import { useNavigate } from 'react-router-dom';
import { IPost } from '../types';
import Photo from './Avatar';
import { AiOutlineLike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../reactQuery/services/apiClient';
import useAlertMessage from '../hooks/userAlertMessage';
import { BsThreeDots } from 'react-icons/bs';
import useItemMenu from '../hooks/useItemMenu';
const ListItem = ({ item }: { item: IPost }) => {
  const { ItemMenu, setIsOpen } = useItemMenu();
  const { user, createdAt, content, imageUrl, likes, _id } = item;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setMessage } = useAlertMessage();
  const onClick = () => {
    navigate(`/${user._id}`);
  };
  const hasLiked = likes.findIndex((like) => like === user._id) >= 0;

  const LikeIcon = !hasLiked ? (
    <AiOutlineLike size={24} />
  ) : (
    <AiFillLike className='text-red-500' size={24} />
  );

  const { mutateAsync: like, isPending: likePending } = useMutation({
    mutationFn: () => {
      return axiosInstance.post(
        `/posts/${_id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`, // include the token in the Authorization header
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => setMessage('something went wrong'),
  });
  const { mutateAsync: unlike, isPending: unlikePending } = useMutation({
    mutationFn: () => {
      return axiosInstance.delete(`/posts/${_id}/unlike`, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('token')}`, // include the token in the Authorization header
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: () => setMessage('something went wrong'),
  });

  const ACTIONS = [
    {
      name: '編輯',
      onClick: () => {},
    },
    {
      name: '刪除',
      onClick: () => {},
    },
  ];

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
        <div className='ml-auto ' onClick={() => setIsOpen((prev) => !prev)}>
          <div className=''>
            <BsThreeDots className='cursor-pointer hover:text-gold' />
            <ItemMenu list={ACTIONS} />
          </div>
        </div>
      </div>
      <article className='mb-4 text-start'>{content}</article>
      {imageUrl && (
        <img src={imageUrl} alt='post' className='w-full rounded-default' />
      )}
      <button
        className='cursor-pointer flex items-center gap-x-1'
        onClick={hasLiked ? () => unlike() : () => like()}
        disabled={likePending || unlikePending}
      >
        {LikeIcon}
        <span>{likes.length ? likes.length : ''}</span>
      </button>
    </div>
  );
};

export default ListItem;
