import { useQuery } from '@tanstack/react-query';
import APIClient from '../../services/apiClient';
import { IUser } from '../../../types';

const useUser = (isLogin: boolean) => {
  const apiClient = new APIClient<IUser>('/users/profile');

  return useQuery<IUser, Error>({
    queryKey: ['user'],
    queryFn: () => apiClient.get(),
    enabled: isLogin,
  });
};
export default useUser;
