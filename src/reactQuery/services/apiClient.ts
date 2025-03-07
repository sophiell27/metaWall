import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

interface IApiResponse<T> {
  status: boolean;
  data: T;
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (timeSort?: string, keyword?: string, userId?: string) =>
    axiosInstance
      .get<IApiResponse<T>>(
        `${this.endpoint}${
          userId ? `/user/${userId}` : ''
        }?timeSort=${timeSort}&keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`, // include the token in the Authorization header
          },
        },
      )
      .then((res) => {
        return res.data.data;
      });
  getById = (id: string | undefined) =>
    axiosInstance
      .get<IApiResponse<T>>(`${this.endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('token')}`, // include the token in the Authorization header
        },
      })
      .then((res) => res.data.data);
  get = () =>
    axiosInstance
      .get<IApiResponse<T>>(this.endpoint, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('token')}`, // include the token in the Authorization header
        },
      })
      .then((res) => res.data.data);
}

export default APIClient;
