import { createContext, ReactNode, useState } from 'react';
import NotificationItem from '../components/NotificationItem';
import { SocketData } from '../services/socket';

interface INotification extends SocketData {
  id: number;
}

interface IToastContext {
  notifications: INotification[];
  addNotification: (notification: SocketData) => void;
}

export const ToastContext = createContext<IToastContext>({
  notifications: [],
  addNotification: (notification: SocketData) => {
    console.log(notification);
  },
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification = (notification: SocketData) => {
    console.log('addNotification', addNotification);
    let id: number;
    setNotifications((prev) => {
      id = prev.length + 1;
      return [...prev, { ...notification, id: prev.length + 1 }];
    });

    setTimeout(() => {
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ notifications, addNotification }}>
      {children}
      <div className='fixed top-4 right-4'>
        <ul className='flex flex-col gap-y-2'>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className='bg-gold px-4 py-1 rounded-md themeBorder'
            >
              <NotificationItem
                senderId={notification.senderId}
                senderName={notification.senderName}
                postId={notification.postId}
              />
            </li>
          ))}
        </ul>
      </div>
    </ToastContext.Provider>
  );
};
