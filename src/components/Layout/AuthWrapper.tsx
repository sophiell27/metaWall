import WallWrapper from '../WallWrapper';

import loginImage from '../../assets/images/loginImg.svg';
import { ReactNode } from 'react';

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <WallWrapper classname='flex justify-center items-center'>
      <div className='py-72px px-12 themeBorder shadowBlend bg-beige gap-x-12 flex flex-col-reverse lg:flex-row justify-center'>
        <img src={loginImage} alt='graphic' className='mt-4 lg:mt-0' />
        <div className=''>
          <h1 className='text-60px text-navy font-extrabold'>MetaWall</h1>
          {children}
        </div>
      </div>
    </WallWrapper>
  );
};
export default AuthWrapper;
