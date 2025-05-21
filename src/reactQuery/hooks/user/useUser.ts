import { useQuery } from '@tanstack/react-query';
import APIClient from '../../services/apiClient';
import { IUser } from '../../../types';
import useAuthStore from '../../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

const useUser = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const apiClient = new APIClient<IUser>('/users/profile');

  return useQuery<IUser | undefined, Error>({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        return await apiClient.get();
      } catch {
        logout();
        navigate('/login');
      }
    },
    enabled: false,
  });
};
export default useUser;
