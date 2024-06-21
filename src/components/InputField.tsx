import { ChangeEvent } from 'react';
import InputLabel from './InputLabel';

interface IInputField {
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  placeholder?: string | undefined;
  label?: string;
  errorMessage?: string;
}

const InputField = ({
  type = 'text',
  onChange,
  value,
  placeholder = '',
  label,
  errorMessage,
}: IInputField) => {
  return (
    <div>
      {label && <InputLabel label={label} />}
      <input
        type={type}
        onChange={onChange}
        value={value}
        className='themeBorder py-4 px-6 placeholder:text-borderGrey w-full'
        placeholder={placeholder}
      />
      {errorMessage && <p className='errorMessage text-left'>{errorMessage}</p>}
    </div>
  );
};

export default InputField;
