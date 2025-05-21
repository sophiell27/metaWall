import { useEffect } from 'react';
import useAuthStore from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import useUser from './user/useUser';

const useAutoAuth = () => {
  const navigate = useNavigate();
  const { refetch } = useUser();
  const { checkAuth, logout } = useAuthStore();
  useEffect(() => {
    const autoAuth = async () => {
      const isAuth = checkAuth();
      if (isAuth) {
        await refetch();
        navigate('/');
      } else {
        logout();
        navigate('/login');
      }
    };
    autoAuth();
  }, []);
};

export default useAutoAuth;
