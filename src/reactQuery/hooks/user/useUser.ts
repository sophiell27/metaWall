import { useQuery } from '@tanstack/react-query';
import APIClient from '../../services/apiClient';
import { IUser } from './useUsers';

const ID = '6653152ac550b8ec12a25c58';

const useUser = () => {
    const apiClient = new APIClient<IUser>('/users/profile');

    return useQuery<IUser, Error>({
        queryKey: ['user', ID],
        queryFn: () => apiClient.get()
    });
};
export default useUser;
