import { useState } from 'react';
import InputField from '../../components/InputField';
import BaseButton from '../../components/BaseButton';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../reactQuery/services/apiClient';
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '../../components/Layout/AuthWrapper';

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      axiosInstance.post('/users/sign_up', {
        email,
        password,
        confirmPassword,
        username,
      }),
    onSuccess: (res) => {
      sessionStorage.setItem('token', res.data.token);
      navigate('/');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        // Handle Axios error with response
        setError(error.response.data.message);
      } else {
        // Handle generic error
        setError(t('message.generalError'));
      }
    },
  });

  return (
    <AuthWrapper>
      <h3 className='mb-9 font-bold'>{t('register')}</h3>
      <div className='flex flex-col gap-y-4 mb-8'>
        <InputField
          type='text'
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          placeholder={t('nickname')}
          errorMessage_key={!username ? 'message.emptyName' : ''}
        />
        <InputField
          type='email'
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          placeholder={t('email')}
        />
        <InputField
          type='password'
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          placeholder={t('password')}
          errorMessage_key={
            password && password.length < 8 ? 'message.passwordLength' : ''
          }
        />
        <InputField
          type='password'
          onChange={(event) => setConfirmPassword(event.target.value)}
          value={confirmPassword}
          placeholder={t('confirmPassword')}
          errorMessage_key={
            confirmPassword && confirmPassword !== password
              ? 'message.passwordNotmatch'
              : ''
          }
        />
      </div>
      <ErrorMessage errorMessage={error} />
      <BaseButton
        label_key='register'
        classname='mb-4'
        onClick={mutateAsync}
        disabled={
          !email ||
          !password ||
          !confirmPassword ||
          !username ||
          isPending ||
          confirmPassword !== password
        }
      />
      <Link to='/login'>{t('login')}</Link>
    </AuthWrapper>
  );
};

export default SignupPage;
