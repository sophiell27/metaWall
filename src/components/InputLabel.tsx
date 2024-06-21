interface IInputLabel {
  label: string;
}
const InputLabel = ({ label }: IInputLabel) => {
  return <p className='text-left mb-2'>{label}</p>;
};
export default InputLabel;
