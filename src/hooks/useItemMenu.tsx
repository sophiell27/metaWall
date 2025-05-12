import { useRef } from 'react';
import useClickOutside from './useClickOutside';

const useItemMenu = () => {
  const menuRef = useRef<HTMLUListElement | null>(null);
  const { setIsOpen, isOpen } = useClickOutside(menuRef);
  const ItemMenu = ({
    list,
  }: {
    list: { name: string; onClick: () => void }[];
  }) => {
    return (
      isOpen && (
        <div className='relative'>
          <ul
            className='absolute top-0 right-4 min-w-[300px] themeBorder shadowBorder-r bg-white divide-y-2 divide-black'
            ref={menuRef}
          >
            {list.map((item) => (
              <li
                key={item.name}
                className='p-4 bg-white hover:bg-gold hover:text-black cursor-pointer'
              >
                <button onClick={item.onClick}>{item.name}</button>
              </li>
            ))}
          </ul>
        </div>
      )
    );
  };

  return { ItemMenu, setIsOpen };
};

export default useItemMenu;
