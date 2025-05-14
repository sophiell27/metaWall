import { useTranslation } from 'react-i18next';
import InputLabel from './InputLabel';
interface IRadioField {
  label_key: string;
  onChange: (value: string) => void;
  radioOptions: {
    id: string;
    name: string;
    value: string;
    label_key: string;
  }[];
  checked: string | undefined;
}

const RadioField = ({
  label_key,
  onChange,
  radioOptions,
  checked,
}: IRadioField) => {
  const { t } = useTranslation();
  return (
    <div>
      {label_key && <InputLabel label={t(label_key)} />}
      <div className='flex gap-x-6'>
        {radioOptions.map(({ id, name, value, label_key }) => (
          <div key={id}>
            <input
              type='radio'
              id={id}
              name={name}
              value={value}
              className='mr-3'
              onClick={() => onChange(value)}
              onChange={(e) => onChange(e.target.value)}
              checked={checked === value}
            />
            <label htmlFor={id}>{t(label_key)}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RadioField;
