import { useMutation, useQueryClient } from '@tanstack/react-query';
import BaseButton from '../../../components/BaseButton';
import Photo from '../../../components/Photo';
import useViewUser from '../../../reactQuery/hooks/user/userViewUser';
import useUserStore from '../../../stores/useUserStore';
import { axiosInstance } from '../../../reactQuery/services/apiClient';

const Follow = ({ userId }: { userId: string | undefined }) => {
  const { userInfo } = useUserStore();
  const { data } = useViewUser(userId);
  const queryClient = useQueryClient();

  const isFollowed =
    data && userInfo
      ? data.followers.findIndex(({ user }) => user === userInfo._id) >= 0
      : false;
  console.log('data.followers', data?.followers);
  console.log('userInfo', userInfo);

  const { mutateAsync: follow, isPending: followPending } = useMutation({
    mutationFn: () =>
      axiosInstance.post(
        `/users/${userId}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`, // include the token in the Authorization header
          },
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      console.log('followeed User');
    },
    onError: () => {
      console.log('Unable to follow user');
    },
  });

  const { mutateAsync: unfollow, isPending: unfollowPending } = useMutation({
    mutationFn: () =>
      axiosInstance.delete(`/users/${userId}/unfollow`, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('token')}`, // include the token in the Authorization header
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      console.log('unfollowed User');
    },
    onError: () => {
      console.log('Unable to unfollow user');
    },
  });
  return (
    data && (
      <div className='flex items-center themeBorder defaultBg shadowBorder rounded-md mb-4 active:'>
        <div className='aspect-square w-24 border-r-2 border-r-black flex justify-center items-center'>
          <Photo imageUrl={data.imageUrl || ''} />
        </div>
        <div className='text-left p-4'>
          <h4>{data.username}</h4>
          <small>{data.followers.length} followers</small>
        </div>
        <div className='ml-auto p-4'>
          <BaseButton
            label={isFollowed ? '停止追蹤' : '追蹤'}
            classname='text-black bg-sunshine px-8 py-2'
            disabled={followPending || unfollowPending}
            onClick={isFollowed ? unfollow : follow}
          />
        </div>
      </div>
    )
  );
};

export default Follow;
