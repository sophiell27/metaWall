import { ChangeEvent } from 'react';

interface IInputField {
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  placeholder: string | undefined;
  errorMessage?: string;
}

const InputField = ({
  type = 'text',
  onChange,
  value,
  placeholder,
  errorMessage,
}: IInputField) => {
  return (
    <div>
      <input
        type={type}
        onChange={onChange}
        value={value}
        className='themeBorder py-4 px-6 placeholder:text-borderGrey w-full'
        placeholder={placeholder}
      />
      {errorMessage && <p className='text-red-500 text-left'>{errorMessage}</p>}
    </div>
  );
};

export default InputField;
