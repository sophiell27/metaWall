import { useQuery } from '@tanstack/react-query';
import APIClient from '../../services/apiClient';
export interface IPost {
  user: {
    name: string;
    _id: string;
    photo: string;
    createdAt: Date;
  };
  content: string;
  imageUrl?: string;
  createdAt: Date;
  _id: string;
}
const usePosts = (timeSort?: string, keyword?: string) => {
  const apiClient = new APIClient<IPost[]>('/posts');
  return useQuery<IPost[], Error>({
    queryKey: ['posts', timeSort, keyword],
    queryFn: () => apiClient.getAll(timeSort, keyword),
  });
};
export default usePosts;
