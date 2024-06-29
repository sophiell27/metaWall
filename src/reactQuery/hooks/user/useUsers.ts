import { useQuery } from '@tanstack/react-query';
import APIClient from '../../services/apiClient';
import { IUser } from '../../../types';

const apiClient = new APIClient<IUser[]>('/users');

const useUsers = () => {
    return useQuery<IUser[], Error>({
        queryKey: ['users'],
        queryFn: () => apiClient.getAll()
    });
};
export default useUsers;
