import clsx from 'clsx';
import { ReactNode } from 'react';

interface IWallPaper {
  children: ReactNode;
  classname?: string;
}
const WallWrapper = ({ children, classname }: IWallPaper) => {
  return (
    <div className='relative min-h-screen w-full overflow-y-visible '>
      {/* Background pattern layer */}
      <div
        className={
          'fixed inset-0 bg-beige bg-[linear-gradient(to_right,#00040029_1px,transparent_1px),linear-gradient(to_bottom,#00040029_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none -z-10'
        }
      />
      <div className={clsx('min-h-screen', classname)}>{children}</div>
    </div>
  );
};

export default WallWrapper;
