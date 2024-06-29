import SectionTitle from '../../components/SectionTitle';
import { useState } from 'react';
import clsx from 'clsx';
import UpdatePassword from './UpdatePassword';
import UpdateProfile from './UpdateProfile';
import useUser from '../../reactQuery/hooks/user/useUser';
import { IUser } from '../../types';

const UpdateInfoPage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const tabs = ['暱稱修改', '重設密碼'];

    const { data, refetch } = useUser();

    return (
        <div className=''>
            <SectionTitle title='修改個人資料' />
            <div className=''>
                <div className='text-left ml-4'>
                    {tabs.map((title, index) => (
                        <button
                            onClick={() => setTabIndex(index)}
                            key={title}
                            className={clsx(
                                ' py-2 px-6 border border-black border-t-2 border-l-2 order-r-2 border-b-transparent rounded-t-md',
                                index === tabIndex
                                    ? 'bg-black text-white'
                                    : 'bg-white text-black'
                            )}>
                            {title}
                        </button>
                    ))}
                </div>
                <div className='itemWrapper mx-auto py-7 px-[105px]'>
                    {tabIndex === 0 ? (
                        <UpdateProfile
                            user={data as unknown as IUser}
                            refetchUser={refetch}
                        />
                    ) : (
                        <UpdatePassword />
                    )}
                </div>
                F ;
            </div>
        </div>
    );
};
export default UpdateInfoPage;
