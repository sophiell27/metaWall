import { useState } from 'react';
import WallWrapper from '../../components/WallWrapper';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../reactQuery/services/apiClient';
import InputField from '../../components/InputField';
import BaseButton from '../../components/BaseButton';
import loginImage from '../../assets/images/loginImg.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutateAsync } = useMutation({
    mutationFn: () => axiosInstance.post('/users/sign_in', { email, password }),
    onSuccess: (res) => {
      console.log('res', res);
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('id', res.data.id);
      navigate('/metawall');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <WallWrapper classname='flex justify-center items-center'>
      <div className='py-72px px-12 themeBorder shadowBlend bg-beige flex gap-x-12 justify-center'>
        <img src={loginImage} alt='' />
        <div className=''>
          <h1 className='text-60px text-navy font-extrabold'>MetaWall</h1>
          <h3 className='mb-9 font-bold'>到元宇宙展開全新社交圈</h3>
          <div className='flex flex-col gap-y-4 mb-8'>
            <InputField
              type='email'
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              placeholder='email'
            />
            <InputField
              type='password'
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              placeholder='password'
              errorMessage={
                password && password.length < 8
                  ? 'password must be at least 8 characters'
                  : ''
              }
            />
          </div>
          <BaseButton
            label='登入'
            classname='mb-4'
            onClick={mutateAsync}
            disabled={!email || !password || password.length < 8}
          />
          <Link to='/metaWall/signup'>註冊帳號</Link>
        </div>
      </div>
    </WallWrapper>
  );
};

export default LoginPage;
