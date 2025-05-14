import { useMutation, useQueryClient } from '@tanstack/react-query';
import BaseButton from '../../../components/BaseButton';
import Photo from '../../../components/Photo';
import useViewUser from '../../../reactQuery/hooks/user/userViewUser';
import useUserStore from '../../../stores/useUserStore';
import { axiosInstance } from '../../../reactQuery/services/apiClient';
import useAlertMessage from '../../../hooks/userAlertMessage';
import { useTranslation } from 'react-i18next';

const Follow = ({ userId }: { userId: string | undefined }) => {
  const { t } = useTranslation();
  const { userInfo } = useUserStore();
  const { data } = useViewUser(userId);
  const queryClient = useQueryClient();
  const { AlertMessage, setMessage } = useAlertMessage();

  const isFollowed =
    data && userInfo
      ? data.followers.findIndex(({ user }) => user === userInfo._id) >= 0
      : false;

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
    },
    onError: () => setMessage(t('message.unableFollow')),
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
    },
    onError: () => setMessage(t('message.unableFollow')),
  });

  return (
    data && (
      <div className='flex items-center themeBorder defaultBg shadowBorder rounded-md mb-4 active:'>
        <div className='aspect-square w-24 border-r-2 border-r-black flex justify-center items-center'>
          <Photo imageUrl={data.imageUrl || ''} />
        </div>
        <div className='text-left p-4'>
          <h4>{data.username}</h4>
          <small>
            {data.followers.length} {t('followers')}
          </small>
        </div>
        <div className='ml-auto p-4'>
          <BaseButton
            label_key={isFollowed ? 'unfollow' : 'follow'}
            classname='!text-black bg-sunshine px-8 py-2'
            disabled={followPending || unfollowPending}
            onClick={isFollowed ? unfollow : follow}
          />
        </div>
        <AlertMessage />
      </div>
    )
  );
};

export default Follow;
