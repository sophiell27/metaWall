import { io, Socket } from 'socket.io-client';

let socket: Socket;

export interface SocketData {
  postId: string;
  senderName: string;
  senderId: string;
}

export interface IUnreadNotificationData {
  senderName: string;
  createdAt: string;
  postId: string;
  senderId: string;
  readStatus: boolean;
}

export const initiateSocketConnection = (userId: string) => {
  socket = io(import.meta.env.VITE_API_BASE_URL);
  console.log('Connecting socket...');
  socket.emit('addUser', userId); // Emit the addUser event with the userId
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const subscribeToLikes = (callback: (data: SocketData) => void) => {
  if (!socket) return;
  socket.on('like-post', (data) => {
    console.log('Post liked event received!');
    callback(data);
  });
};

export const subscribeToUnreadNotification = (
  callback: (data: IUnreadNotificationData[]) => void,
) => {
  if (!socket) return;
  socket.on('unreadNotifications', (data) => {
    console.log('Unread notification event received!');
    callback(data);
  });
};
