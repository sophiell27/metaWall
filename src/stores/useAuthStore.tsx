import { create } from 'zustand';
import { isTokenExpired } from '../utils';

const useAuthStore = create<{
  isLogin: boolean;
  login: (token: string, id: string) => void;
  logout: () => void;
  checkAuth: () => boolean;
}>((set) => ({
  isLogin: false,
  login: (token: string, id: string) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('id', id);
    set({ isLogin: true });
  },
  logout: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    set({ isLogin: false });
  },
  checkAuth: () => {
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');
    if (token && id && !isTokenExpired(token)) {
      set({ isLogin: true });
      return true;
    } else {
      set({ isLogin: false });
      return false;
    }
  },
}));

export default useAuthStore;
