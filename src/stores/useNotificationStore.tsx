import { create } from 'zustand';
import { IUnreadNotificationData } from '../services/socket';

const useNotificationStore = create<{
  unreadNotifications: IUnreadNotificationData[] | null;
  setUnreadNotifications: (
    unreadNotifications: IUnreadNotificationData[],
  ) => void;
}>((set) => ({
  unreadNotifications: null,
  setUnreadNotifications: (unreadNotifications: IUnreadNotificationData[]) => {
    set({ unreadNotifications });
  },
}));

export default useNotificationStore;
