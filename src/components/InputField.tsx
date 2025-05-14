import { ChangeEvent } from 'react';
import InputLabel from './InputLabel';
import { useTranslation } from 'react-i18next';

interface IInputField {
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  placeholder?: string | undefined;
  label_key?: string;
  errorMessage_key?: string;
}

const InputField = ({
  type = 'text',
  onChange,
  value,
  placeholder = '',
  label_key,
  errorMessage_key,
}: IInputField) => {
  const { t } = useTranslation();
  return (
    <div>
      {label_key && <InputLabel label={t(label_key)} />}
      <input
        type={type}
        onChange={onChange}
        value={value}
        className='themeBorder py-4 px-6 placeholder:text-borderGrey w-full'
        placeholder={placeholder}
      />
      {errorMessage_key && (
        <p className='errorMessage text-left'>{t(errorMessage_key)}</p>
      )}
    </div>
  );
};

export default InputField;
