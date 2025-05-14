import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface IBaseButton {
  label_key: string;
  classname?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const BaseButton = ({
  label_key,
  classname,
  onClick,
  disabled = false,
}: IBaseButton) => {
  const { t } = useTranslation();
  return (
    <button
      className={clsx(
        'w-full py-4 bg-navy text-white rounded-default shadow-button border-2 border-black ml-[2.5px] disabled:bg-fogBlue disabled:border-2 disabled:border-darkGrey  disabled:shadow-none active:shadow-none',
        classname,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {t(label_key)}
    </button>
  );
};

export default BaseButton;
