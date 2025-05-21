import { useState } from 'react';
import InputField from '../../components/InputField';
import BaseButton from '../../components/BaseButton';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../reactQuery/services/apiClient';
import useAlertMessage from '../../hooks/userAlertMessage';
import { useTranslation } from 'react-i18next';

const UpdatePassword = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setMessage, AlertMessage } = useAlertMessage();

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
            Authorization: `Bearer ${sessionStorage.getItem('token')}`, // include the token in the Authorization header
          },
        },
      );
    },
    onSuccess: (res) => {
      sessionStorage.setItem('token', res.data.token);
      setPassword('');
      setConfirmPassword('');
    },
    onError: () => setMessage(t('message.unableUpdatePassword')),
  });
  return (
    <>
      <AlertMessage />
      <div className='flex flex-col gap-y-4 mb-8'>
        <InputField
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder={t('insertNewPasswordPls')}
          label_key='insertNewPassword'
        />
        <InputField
          type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder={t('insertPasswordAgain')}
          label_key='insertAgain'
        />
      </div>
      <BaseButton
        label_key='resetPassword'
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
