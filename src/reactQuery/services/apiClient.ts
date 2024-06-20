import axios from 'axios';

const axiosInstance = axios.create({
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
      )
      .then((res) => {
        return res.data.data;
      });
  get = (id: string) =>
    axiosInstance
      .get<IApiResponse<T>>(`${this.endpoint}/${id}`)
      .then((res) => res.data.data);
}

export default APIClient;
