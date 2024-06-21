import Avatar from '../../components/Avatar';
import profileDefault from '../../assets/images/profile_default.png';
import InputField from '../../components/InputField';
import { useState } from 'react';
import RadioField from '../../components/RadioField';
import BaseButton from '../../components/BaseButton';

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('male');
  const radioOptions = [
    { id: 'male', name: 'gender', value: 'male', label: '男性' },
    { id: 'female', name: 'gender', value: 'female', label: '女性' },
  ];

  return (
    <div>
      <div className='flex flex-col items-center'>
        <Avatar size='w-[108px] h-[108px]'>
          <img src={profileDefault} alt='' />
        </Avatar>
        <input
          type='file'
          className='p-2 bg-black text-white mt-4 mb-3 w-auto'
          accept='image/png, image/jpeg'
        />
        <div className='flex flex-col gap-y-4 mb-8 w-full'>
          <InputField
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            label='暱稱'
          />
          <RadioField
            label='性別'
            onChange={(e) => setGender(e.target.value)}
            radioOptions={radioOptions}
            checked={gender}
          />
        </div>
      </div>

      <p className='errorMessage'>1.圖片寬高比必需為 1:1，請重新輸入</p>
      <p className='errorMessage'> 2. 解析度寬度至少 300像素以上，請重新輸入</p>
      <BaseButton classname='mt-4' label='送出更新' disabled={!username} />
    </div>
  );
};
export default UpdateProfile;
