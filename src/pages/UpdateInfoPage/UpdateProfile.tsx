import Avatar from '../../components/Avatar';
import InputField from '../../components/InputField';
import { ChangeEvent, useState } from 'react';
import RadioField from '../../components/RadioField';
import BaseButton from '../../components/BaseButton';
import { IUser } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../reactQuery/services/apiClient';
import { AxiosError } from 'axios';

interface IProps {
  user: IUser | undefined;
  refetchUser: () => void;
}

const RADIO_OPTIONS = [
  { id: 'male', name: 'gender', value: 'male', label: '男性' },
  { id: 'female', name: 'gender', value: 'female', label: '女性' },
];

const UpdateProfile = ({ user, refetchUser }: IProps) => {
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
    onError: (err) => {
      console.log(err);
    },
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
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <div>
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
            label='暱稱'
          />
          <RadioField
            label='性別'
            onChange={handleChangeGender}
            radioOptions={RADIO_OPTIONS}
            checked={data.gender || undefined}
          />
        </div>
      </div>

      <p className='errorMessage'>1.圖片寬高比必需為 1:1，請重新輸入</p>
      <p className='errorMessage'> 2. 解析度寬度至少 300像素以上，請重新輸入</p>
      <BaseButton
        classname='mt-4'
        label='送出更新'
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
