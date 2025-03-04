import { useState } from 'react';
import WallWrapper from '../../components/WallWrapper';
import InputField from '../../components/InputField';
import BaseButton from '../../components/BaseButton';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../reactQuery/services/apiClient';
import loginImage from '../../assets/images/loginImg.svg';
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage';

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const { mutateAsync } = useMutation({
    mutationFn: () =>
      axiosInstance.post('/users/sign_up', {
        email,
        password,
        confirmPassword,
        username,
      }),
    onSuccess: (res) => {
      sessionStorage.setItem('token', res.data.token);
      navigate('/metaWall');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        // Handle Axios error with response
        setError(error.response.data.message);
      } else {
        // Handle generic error
        setError('Something went wrong. Please try again later.');
      }
    },
  });

  return (
    <WallWrapper classname='flex justify-center items-center'>
      <div className='py-72px px-12 themeBorder shadowBlend bg-beige flex gap-x-12 justify-center'>
        <img src={loginImage} alt='' />
        <div className=''>
          <h1 className='text-60px text-navy font-extrabold'>MetaWall</h1>
          <h3 className='mb-9 font-bold'>註冊</h3>
          <div className='flex flex-col gap-y-4 mb-8'>
            <InputField
              type='text'
              onChange={(event) => setUsername(event.target.value)}
              value={username}
              placeholder='暱稱'
              errorMessage={!username ? 'username must not be empty' : ''}
            />
            <InputField
              type='email'
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              placeholder='Email'
            />
            <InputField
              type='password'
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              placeholder='Password'
              errorMessage={
                password && password.length < 8
                  ? 'password must be at least 8 characters'
                  : ''
              }
            />
            <InputField
              type='password'
              onChange={(event) => setConfirmPassword(event.target.value)}
              value={confirmPassword}
              placeholder='confirm password'
              errorMessage={
                confirmPassword && confirmPassword !== password
                  ? 'password not match'
                  : ''
              }
            />
          </div>
          <ErrorMessage errorMessage={error} />
          <BaseButton
            label='註冊'
            classname='mb-4'
            onClick={mutateAsync}
            disabled={!email || !password || !confirmPassword || !username}
          />
          <Link to='/metaWall/login'>登入</Link>
        </div>
      </div>
    </WallWrapper>
  );
};

export default SignupPage;
