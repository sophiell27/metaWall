import { useQuery } from '@tanstack/react-query';
import APIClient from '../../services/apiClient';
import { IUser } from '../../../types';

const useViewUser = (id: string | undefined) => {
  const apiClient = new APIClient<IUser>('/users');
  return useQuery<IUser, Error>({
    queryKey: ['user', id],
    queryFn: () => apiClient.getById(id),
    enabled: !!id,
  });
};
export default useViewUser;
