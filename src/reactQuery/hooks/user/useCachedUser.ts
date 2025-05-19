import { useQueryClient } from '@tanstack/react-query';
import { IUser } from '../../../types';

const useCachedUser = (): IUser | undefined => {
  const queryClient = useQueryClient();
  const cachedUser = queryClient.getQueryData<IUser>(['user']);
  return cachedUser;
};

export default useCachedUser;
