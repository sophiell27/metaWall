import { ChangeEvent } from 'react';
import InputLabel from './InputLabel';
interface IRadioField {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  radioOptions: {
    id: string;
    name: string;
    value: string;
    label: string;
  }[];
  checked: string;
}

const RadioField = ({
  label,
  onChange,
  radioOptions,
  checked,
}: IRadioField) => {
  return (
    <div>
      {label && <InputLabel label={label} />}
      <div className='flex gap-x-6'>
        {radioOptions.map(({ id, name, value, label }) => (
          <div key={id}>
            <input
              type='radio'
              id={id}
              name={name}
              value={value}
              className='mr-3'
              onChange={onChange}
              checked={checked === value}
            />
            <label htmlFor={id}>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RadioField;
