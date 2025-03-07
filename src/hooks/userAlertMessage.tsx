import { useState } from 'react';
import BaseButton from '../components/BaseButton';

const useAlertMessage = () => {
  const [message, setMessage] = useState('');

  const AlertMessage = () => {
    return (
      message && (
        <div className='z-10 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-400/60'>
          <div className='z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit px-10 py-3 bg-gold rounded-3xl  themeBorder'>
            <p className='mb-3'>{message}</p>
            <BaseButton
              label='OK'
              onClick={() => setMessage('')}
              classname='shadow-none bg-transparent active:opacity-50'
            />
          </div>
        </div>
      )
    );
  };

  return { AlertMessage, setMessage };
};

export default useAlertMessage;
