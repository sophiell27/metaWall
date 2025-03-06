import BaseButton from '../../../components/BaseButton';
import Photo from '../../../components/Photo';
import useViewUser from '../../../reactQuery/hooks/user/userViewUser';
import useUserStore from '../../../stores/useUserStore';

const Follow = ({ userId }: { userId: string | undefined }) => {
  const { userInfo } = useUserStore();
  const { data } = useViewUser(userId);

  const isFollowed =
    data && userInfo
      ? data.followers.findIndex((id) => id === userInfo._id) >= 0
      : false;

  const followUser = () => {
    console.log('follow');
  };
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
            label='追蹤'
            classname='text-black bg-sunshine px-8 py-2'
            disabled={isFollowed}
            onClick={followUser}
          />
        </div>
      </div>
    )
  );
};

export default Follow;
