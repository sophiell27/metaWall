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

  getAll = (timeSort?: string, keyword?: string) =>
    axiosInstance
      .get<IApiResponse<T>>(
        `${this.endpoint}?timeSort=${timeSort}&keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem('token')}`, // include the token in the Authorization header
          },
        },
      )
      .then((res) => {
        return res.data.data;
      });
  getByid = (id: string) =>
    axiosInstance
      .get<IApiResponse<T>>(`${this.endpoint}/${id}`)
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
