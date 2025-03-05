import { create } from 'zustand';
import { IUser } from '../types';

const useUserStore = create<{
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  userInfo: IUser | undefined;
  setUserInfo: (userInfo: IUser | undefined) => void;
}>((set) => ({
  isLogin: false,
  setIsLogin: (isLogin: boolean) => set({ isLogin }),
  userInfo: undefined,
  setUserInfo: (userInfo: IUser | undefined) => set({ userInfo }),
}));
export default useUserStore;
