import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../reactQuery/services/apiClient';
import InputField from '../../components/InputField';
import BaseButton from '../../components/BaseButton';
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '../../components/Layout/AuthWrapper';
import useAuthStore from '../../stores/useAuthStore';
import useUser from '../../reactQuery/hooks/user/useUser';
import useAutoAuth from '../../reactQuery/hooks/useAutoAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const { refetch } = useUser();

  useAutoAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => axiosInstance.post('/users/sign_in', { email, password }),
    onSuccess: async (res) => {
      login(res.data.token, res.data.id);
      await refetch();
      navigate('/');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        // Handle Axios error with response
        setError('Something went wrong');
      } else {
        // Handle generic error
        setError('Something went wrong. Please try again later.');
      }
    },
  });

  return (
    <AuthWrapper>
      <h3 className='mb-9 font-bold'>{t('welcome_message')}</h3>
      <div className='flex flex-col gap-y-4 mb-8'>
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
      </div>
      <ErrorMessage errorMessage={error} />
      <BaseButton
        label_key='login'
        classname='mb-4'
        onClick={mutateAsync}
        disabled={!email || !password || password.length < 8 || isPending}
      />
      <Link to='/signup'>{t('registerAccount')}</Link>
    </AuthWrapper>
  );
};

export default LoginPage;
