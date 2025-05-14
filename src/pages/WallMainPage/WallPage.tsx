import EmptyList from '../../components/EmptyList';
import ListItem from './component/ListItem';
import Search from '../../components/Search';
import Select from '../../components/Select';
import usePosts from '../../reactQuery/hooks/post/usePosts';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Follow from './component/Follow';
import useUserStore from '../../stores/useUserStore';
const OPTIONS_KEY = ['newestPost', 'oldestPost'];
const WallPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [keyword, setKeyWord] = useState('');

  const timeSort = selectedIndex === 0 ? 'desc' : 'asc';
  const { userId } = useParams();
  const { data } = usePosts(timeSort, keyword, userId);
  const { userInfo } = useUserStore();

  return (
    <div className=''>
      {userId !== userInfo?._id && <Follow userId={userId} />}
      <section className='grid grid-cols-[1fr_4fr] gap-x-6'>
        <Select
          option_keys={OPTIONS_KEY}
          selectedIndex={selectedIndex}
          handleSelect={setSelectedIndex}
        />
        <Search value={keyword} setValue={setKeyWord} />
      </section>
      <section>
        <div className='mt-4 flex flex-col gap-y-4'>
          {data?.length === 0 ? (
            <EmptyList />
          ) : (
            data?.map((item) => <ListItem item={item} key={item._id} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default WallPage;
