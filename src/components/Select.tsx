import { useRef } from 'react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import useClickOutside from '../hooks/useClickOutside';
interface ISelect {
  handleSelect: (index: number) => void;
  selectedIndex: number;
  options: string[];
}
const Select = ({ handleSelect, selectedIndex, options }: ISelect) => {
  const selectRef = useRef<HTMLDivElement | null>(null);
  const { setIsOpen, isOpen } = useClickOutside(selectRef);

  return (
    <div className='flex-1'>
      <div className='flex flex-col relative'>
        {!isOpen ? (
          <div className='field alignIcon' onClick={() => setIsOpen(true)}>
            <p>{options[selectedIndex]}</p>
            <FaChevronDown />
          </div>
        ) : (
          <div
            className='absolute flex flex-col field gap-y-3 w-full'
            ref={selectRef}
          >
            {options.map((option, index) => (
              <button
                key={option}
                className='alignIcon w-full'
                onClick={() => {
                  handleSelect(index);
                  setIsOpen(false);
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
