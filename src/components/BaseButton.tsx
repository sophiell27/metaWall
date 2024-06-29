import clsx from 'clsx';

interface IBaseButton {
  label: string;
  classname?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const BaseButton = ({
  label,
  classname,
  onClick,
  disabled = false,
}: IBaseButton) => {
  return (
    <button
      className={clsx(
        'w-full bg-navy text-white py-4 rounded-default shadow-button ml-[2.5px] disabled:bg-fogBlue disabled:border-2 disabled:border-darkGrey  disabled:shadow-none   @apply active:shadow-none',
        classname,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default BaseButton;
