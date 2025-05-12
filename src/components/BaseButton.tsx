import clsx from 'clsx';

interface IBaseButton {
  label: string;
  classname?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const BaseButton = ({
  label,
  classname = 'bg-navy text-white',
  onClick,
  disabled = false,
}: IBaseButton) => {
  return (
    <button
      className={clsx(
        'w-full py-4 rounded-default shadow-button border-2 border-black ml-[2.5px] disabled:bg-fogBlue disabled:border-2 disabled:border-darkGrey  disabled:shadow-none active:shadow-none',
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
