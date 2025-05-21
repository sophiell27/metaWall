import useClickOutside from '../../hooks/useClickOutside';
import { useRef } from 'react';
import { ReactNode } from 'react';

interface IProps {
  trigger: ReactNode;
  children: ({ close }: { close: () => void }) => ReactNode;
}

const Dropdown = ({ trigger, children }: IProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { setIsOpen, isOpen } = useClickOutside(dropdownRef);

  return (
    <div
      className='cursor-pointer'
      onClick={() => setIsOpen((prev) => !prev)}
      ref={dropdownRef}
    >
      {trigger}
      <div className='relative'>
        {isOpen && (
          <ul className='z-20 absolute top-1 right-4 themeBorder shadowBorder-r whitespace-nowrap bg-white divide-y-2 divide-black'>
            {children({
              close: () => setIsOpen(false),
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
