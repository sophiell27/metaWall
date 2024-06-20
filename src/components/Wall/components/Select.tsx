import { useState } from 'react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
interface ISelect {
  handleSelect: (index: number) => void;
  selectedIndex: number;
  options: string[];
}
const Select = ({ handleSelect, selectedIndex, options }: ISelect) => {
  const [isExpand, setIsExpand] = useState(false);

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
                  // setSelectedIndex(index);
                  handleSelect(index);
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
