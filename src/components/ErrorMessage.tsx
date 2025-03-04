interface IErrorMessage {
  errorMessage?: string;
}

const ErrorMessage = ({ errorMessage }: IErrorMessage) => {
  return (
    errorMessage && <p className='errorMessage text-left'>{errorMessage}</p>
  );
};
export default ErrorMessage;
