import clsx from 'clsx';
import { ReactNode } from 'react';

const Avatar = ({
  size = 'h-7 w-7',
  borderColorClass = 'themeBorder',
  textColorClass,
  backgroundColorClass = 'defaultBg',
  children,
}: {
  size?: string;
  borderColorClass?: string;
  textColorClass?: string;
  backgroundColorClass?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={clsx(
        'rounded-full border-2 overflow-hidden flex justify-center items-center ',
        size,
        borderColorClass,
        textColorClass,
        backgroundColorClass,
      )}
    >
      {children}
    </div>
  );
};

export default Avatar;
