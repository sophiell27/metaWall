import { useState } from 'react';
import InputField from '../../components/InputField';
import BaseButton from '../../components/BaseButton';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      />
    </>
  );
};
export default UpdatePassword;
