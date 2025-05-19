import { create } from 'zustand';

const useUserStore = create<{
  isLogin: boolean;
  login: (token: string, id: string) => void;
  logout: () => void;
}>((set) => ({
  isLogin: false,
  login: (token: string, id: string) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('id', id);
    set({ isLogin: true });
  },
  logout: () => {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('id', '');
    set({ isLogin: false });
  },
}));

export default useUserStore;
