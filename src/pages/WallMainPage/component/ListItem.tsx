import { useNavigate } from 'react-router-dom';
import { IPost } from '../../../types';
import Photo from '../../../components/Avatar';
import { AiOutlineLike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../../reactQuery/services/apiClient';
import useAlertMessage from '../../../hooks/userAlertMessage';
import { BsThreeDots } from 'react-icons/bs';
import useItemMenu from '../../../hooks/useItemMenu';
import { useState } from 'react';
import useUserStore from '../../../stores/useUserStore';
import { useTranslation } from 'react-i18next';
const ListItem = ({ item }: { item: IPost }) => {
  const { t } = useTranslation();
  const { ItemMenu, setIsOpen } = useItemMenu();
  const { userInfo } = useUserStore();
  const { user, createdAt, content, imageUrl, likes, _id } = item;
  const [hasLiked, setHasLiked] = useState<boolean>(
    likes.findIndex((like) => like === user._id) >= 0,
  );
  const [likeCount, setLikeCount] = useState<number>(likes.length);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setMessage } = useAlertMessage();
  const isUserWall = userInfo?._id === user._id;
  const onClick = () => {
    navigate(`/${user._id}`);
  };

  const LikeIcon = !hasLiked ? (
    <AiOutlineLike size={24} />
  ) : (
    <AiFillLike className='text-red-500' size={24} />
  );

  const { mutateAsync: like } = useMutation({
    mutationFn: () => {
      setHasLiked(true);
      setLikeCount(likeCount + 1);
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
      queryClient.setQueryData(['posts'], (oldData: { data: IPost[] }) => {
        if (!oldData) return;
        return {
          ...oldData,
          data: oldData.data.map((post: IPost) => {
            if (post._id === _id) {
              return {
                ...post,
                likes: [...post.likes, user._id],
              };
            }
            return post;
          }),
        };
      });
    },
    onError: () => {
      setHasLiked(false);
      setLikeCount(likeCount - 1);
      setMessage(t(''));
    },
  });
  const { mutateAsync: unlike } = useMutation({
    mutationFn: () => {
      setHasLiked(false);
      setLikeCount(likeCount - 1);
      return axiosInstance.delete(`/posts/${_id}/unlike`, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('token')}`, // include the token in the Authorization header
        },
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(['posts'], (oldData: { data: IPost[] }) => {
        if (!oldData) return;
        return {
          ...oldData,
          data: oldData.data.map((post: IPost) => {
            if (post._id === _id) {
              return {
                ...post,
                likes: post.likes.filter((like) => like !== user._id),
              };
            }
            return post;
          }),
        };
      });
    },
    onError: () => {
      setHasLiked(true);
      setLikeCount(likeCount + 1);
      setMessage(t('message.generalError'));
    },
  });

  const { mutateAsync: deletePost, isPending: deletePostPending } = useMutation(
    {
      mutationFn: () => {
        console.log('deletePost');
        return axiosInstance.delete(`/posts/${_id}`, {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`, // include the token in the Authorization header
          },
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        console.log('delete success');
      },
      onError: () => {
        console.log('delete error');
        setMessage(t('message.generalError'));
      },
    },
  );

  const ACTIONS = [
    {
      name: t('delete'),
      onClick: deletePost,
    },
  ];

  return deletePostPending ? (
    <p>deleting</p>
  ) : (
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
          {isUserWall && (
            <div>
              <BsThreeDots className='cursor-pointer hover:text-gold' />
              <ItemMenu list={ACTIONS} />
            </div>
          )}
        </div>
      </div>
      <article className='mb-4 text-start'>{content}</article>
      {imageUrl && (
        <img src={imageUrl} alt='post' className='w-full rounded-default' />
      )}
      <button
        className='cursor-pointer flex items-center gap-x-1'
        onClick={hasLiked ? () => unlike() : () => like()}
      >
        {LikeIcon}
        <span>{likeCount ? likeCount : ''}</span>
      </button>
    </div>
  );
};

export default ListItem;
