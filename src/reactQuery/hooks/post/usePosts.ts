import { useQuery } from '@tanstack/react-query';
import APIClient from '../../services/apiClient';
import { IPost } from '../../../types';

const usePosts = (timeSort?: string, keyword?: string, userId?: string) => {
  const apiClient = new APIClient<IPost[]>('/posts');

  return useQuery<IPost[], Error>({
    queryKey: ['posts', timeSort, keyword, userId],
    queryFn: () => apiClient.getAll(timeSort, keyword, userId),
  });
};
export default usePosts;
