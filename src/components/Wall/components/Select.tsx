import { useState } from 'react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';

const Select = ({
  handleSelect,
}: {
  handleSelect?: (index: number) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isExpand, setIsExpand] = useState(false);
  const options = ['最新貼文', '最舊貼文'];
  return (
    <div className='flex-1'>
      <div className='flex flex-col relative'>
        {!isExpand ? (
          <div
            className='field alignIcon'
            onClick={() => setIsExpand((prev) => !prev)}
          >
            <p>{options[selectedIndex]}</p>
            <FaChevronDown />
          </div>
        ) : (
          <div className='absolute flex flex-col field gap-y-3 w-full'>
            {options.map((option, index) => (
              <button
                key={option}
                className='alignIcon w-full'
                onClick={() => {
                  setSelectedIndex(index);
                  handleSelect && handleSelect(index);
                  setIsExpand(false);
                }}
              >
                <p className='self-center'>{option}</p>
                {index === selectedIndex && <FaCheck />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
