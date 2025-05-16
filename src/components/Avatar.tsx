import clsx from 'clsx';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
const Avatar = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-full border-2 overflow-hidden flex justify-center items-center h-7 w-7 themeBorder defautlBg',
          className,
        ),
      )}
    >
      {children}
    </div>
  );
};

export default Avatar;
