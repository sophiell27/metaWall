import { FaSearch } from 'react-icons/fa';

interface ISearch {
  value: string;
  setValue: (value: string) => void;
}
const Search = ({ value, setValue }: ISearch) => {
  return (
    <div className='flex themeBorder'>
      <input
        type='text'
        className='defaultBg p-3 w-full'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='搜尋貼文'
      />
      <button className='bg-navy p-3 text-white text-xl border-l-2 border-l-black'>
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
