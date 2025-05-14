import { useRef } from 'react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import useClickOutside from '../hooks/useClickOutside';
import { useTranslation } from 'react-i18next';
interface ISelect {
  handleSelect: (index: number) => void;
  selectedIndex: number;
  option_keys: string[];
}
const Select = ({ handleSelect, selectedIndex, option_keys }: ISelect) => {
  const { t } = useTranslation();
  const selectRef = useRef<HTMLDivElement | null>(null);
  const { setIsOpen, isOpen } = useClickOutside(selectRef);

  return (
    <div className='flex-1'>
      <div className='flex flex-col relative'>
        {!isOpen ? (
          <div className='field alignIcon' onClick={() => setIsOpen(true)}>
            <p>{t(option_keys[selectedIndex])}</p>
            <FaChevronDown />
          </div>
        ) : (
          <div
            className='absolute flex flex-col field gap-y-3 w-full'
            ref={selectRef}
          >
            {option_keys.map((key, index) => (
              <button
                key={t(key)}
                className='alignIcon w-full'
                onClick={() => {
                  handleSelect(index);
                  setIsOpen(false);
                }}
              >
                <p className='self-center'>{t(key)}</p>
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
