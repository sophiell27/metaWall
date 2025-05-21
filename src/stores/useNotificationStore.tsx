import { create } from 'zustand';
import { UnreadNotificationData } from '../services/socket';

const useNotificationStore = create<{
  unreadNotifications: UnreadNotificationData[] | null;
  setUnreadNotifications: (
    unreadNotifications: UnreadNotificationData[],
  ) => void;
}>((set) => ({
  unreadNotifications: null,
  setUnreadNotifications: (unreadNotifications: UnreadNotificationData[]) => {
    set({ unreadNotifications });
  },
}));

export default useNotificationStore;
