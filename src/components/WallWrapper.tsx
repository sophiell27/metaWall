import clsx from 'clsx';
import { ReactNode } from 'react';

interface IWallPaper {
  children: ReactNode;
  classname?: string;
}
const WallWrapper = ({ children, classname }: IWallPaper) => {
  return (
    <div className='h-screen w-full relative'>
      <div
        className={clsx(
          'absolute top-0 bottom-0 left-0 right-0 inset-0 bg-beige bg-[linear-gradient(to_right,#00040029_1px,transparent_1px),linear-gradient(to_bottom,#00040029_1px,transparent_1px)] bg-[size:64px_64px]',
          classname,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default WallWrapper;
