import { useQuery } from '@tanstack/react-query';
import APIClient from '../../services/apiClient';

export interface IUser {
  name: string;
  email: string;
  photo: string;
  id: string;
}

const apiClient = new APIClient<IUser[]>('/users');

const useUsers = () => {
  return useQuery<IUser[], Error>({
    queryKey: ['users'],
    queryFn: () => apiClient.getAll(),
  });
};
export default useUsers;
