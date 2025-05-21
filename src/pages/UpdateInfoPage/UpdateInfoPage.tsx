import SectionTitle from '../../components/SectionTitle';
import { useState } from 'react';
import clsx from 'clsx';
import UpdatePassword from './UpdatePassword';
import UpdateProfile from './UpdateProfile';
import useUser from '../../reactQuery/hooks/user/useUser';
import { IUser } from '../../types';
import { useTranslation } from 'react-i18next';
import useCachedUser from '../../reactQuery/hooks/user/useCachedUser';

const UpdateInfoPage = () => {
  const { t } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);
  const tabs_key = ['changeNickname', 'resetPassword'];
  const userInfo: IUser | undefined = useCachedUser();

  const { refetch } = useUser();

  return (
    <div className=''>
      <SectionTitle title={t('updateInfo')} />
      <div className=''>
        <div className='text-left ml-4'>
          {tabs_key.map((title, index) => (
            <button
              onClick={() => setTabIndex(index)}
              key={title}
              className={clsx(
                ' py-2 px-6 border border-black border-t-2 border-l-2 order-r-2 border-b-transparent rounded-t-md',
                index === tabIndex
                  ? 'bg-black text-white'
                  : 'bg-white text-black',
              )}
            >
              {t(title)}
            </button>
          ))}
        </div>
        <div className='itemWrapper mx-auto py-7 px-[105px]'>
          {tabIndex === 0 ? (
            <UpdateProfile user={userInfo} refetchUser={refetch} />
          ) : (
            <UpdatePassword />
          )}
        </div>
      </div>
    </div>
  );
};
export default UpdateInfoPage;
