import Avatar from '../../components/Avatar';
import InputField from '../../components/InputField';
import { ChangeEvent, useState } from 'react';
import RadioField from '../../components/RadioField';
import BaseButton from '../../components/BaseButton';
import { IUser } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../reactQuery/services/apiClient';
import { AxiosError } from 'axios';
import useAlertMessage from '../../hooks/userAlertMessage';
import { useTranslation } from 'react-i18next';

interface IProps {
  user: IUser | undefined;
  refetchUser: () => void;
}

const RADIO_OPTIONS = [
  { id: 'male', name: 'gender', value: 'male', label_key: 'male' },
  { id: 'female', name: 'gender', value: 'female', label_key: 'female' },
];

const UpdateProfile = ({ user, refetchUser }: IProps) => {
  const { t } = useTranslation();
  const { setMessage, AlertMessage } = useAlertMessage();
  const initialValue = {
    username: user?.username || '',
    gender: user?.gender || null,
  };
  const [data, setData] = useState<{
    username: string;
    gender: 'male' | 'female' | null;
  }>(initialValue);

  const handleChangeGender = (value: string) => {
    if (value === data.gender) {
      return setData((prev) => ({ ...prev, gender: null }));
    }
    if (value === 'male' || value === 'female') {
      setData((prev) => ({ ...prev, gender: value }));
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const data = new FormData();
    if (e.target.files && e.target.files[0]) {
      data.append('data', e.target.files[0]);
    }
    uploadImage(data);
  };

  const { mutateAsync: uploadImage } = useMutation<any, AxiosError, FormData>({
    mutationFn: (payload) => {
      return axiosInstance.post('/users/upload', payload, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
        },
      });
    },
    onSuccess: async () => {
      refetchUser();
    },
    onError: () => setMessage(t('message.unableImg')),
  });
  const { mutateAsync: changeInfo } = useMutation<any, AxiosError>({
    mutationFn: () => {
      return axiosInstance.patch(
        '/users/profile',
        {
          username: data.username,
          gender: data.gender,
          // gender: undefined
        },
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
          },
        },
      );
    },
    onSuccess: async () => {
      refetchUser();
    },
    onError: () => setMessage(t('message.unableChangeInfo')),
  });

  return (
    <div>
      <AlertMessage />
      <div className='flex flex-col items-center'>
        <Avatar size='w-[108px] h-[108px]'>
          <img src={user?.imageUrl} alt='' />
        </Avatar>
        <input
          type='file'
          className='p-2 bg-black text-white mt-4 mb-3 w-auto'
          accept='image/png, image/jpeg'
          onChange={handleChangeImage}
        />
        <div className='flex flex-col gap-y-4 mb-8 w-full'>
          <InputField
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
            value={data.username}
            label_key='nickname'
          />
          <RadioField
            label_key='gender'
            onChange={handleChangeGender}
            radioOptions={RADIO_OPTIONS}
            checked={data.gender || undefined}
          />
        </div>
      </div>

      <p className='errorMessage'>1. {t('message.imgWarning1')}</p>
      <p className='errorMessage'> 2. {t('message.imgWarning2')}</p>
      <BaseButton
        classname='mt-4'
        label_key='sendUpdate'
        disabled={
          !data.username ||
          JSON.stringify(initialValue) === JSON.stringify(data)
        }
        onClick={changeInfo}
      />
    </div>
  );
};
export default UpdateProfile;
