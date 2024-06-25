import { useState } from 'react';
import InputField from '../../components/InputField';
import BaseButton from '../../components/BaseButton';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../reactQuery/services/apiClient';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { mutateAsync } = useMutation({
    mutationFn: () => {
      return axiosInstance.post(
        '/users/updatePassword',
        {
          password,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`, // include the token in the Authorization header
          },
        },
      );
    },
    onSuccess: (res) => {
      console.log('res', res);
      sessionStorage.setItem('token', res.data.token);
      setPassword('');
      setConfirmPassword('');
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <>
      <div className='flex flex-col gap-y-4 mb-8'>
        <InputField
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder='請輸入新密碼'
          label='輸入新密碼'
        />
        <InputField
          type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder='再次輸入新密碼'
          label='再次輸入'
        />
      </div>
      <BaseButton
        label='重設密碼'
        disabled={Boolean(
          password !== confirmPassword ||
            !password ||
            !confirmPassword ||
            (password && password.length < 8),
        )}
        onClick={mutateAsync}
      />
    </>
  );
};
export default UpdatePassword;
