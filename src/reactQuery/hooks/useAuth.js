import { useEffect, useState } from 'react';
import { isTokenExpired } from '../../utils';
const useLoginAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = window.sessionStorage.getItem('token');
      if (token) {
        const isExpired = isTokenExpired(token);
        if (!isExpired) {
          setIsAuth(true);
        }
      }
    };
    checkAuth();
  }, []);

  return { isAuth };
};
export default useLoginAuth;
