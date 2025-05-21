import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutPage from './pages/LayoutPage/LayoutPage';
import WallMainPage from './pages/WallMainPage/WallMainPage';
import WallPage from './pages/WallMainPage/WallPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import { ReactNode, useEffect } from 'react';
import UpdateInfoPage from './pages/UpdateInfoPage/UpdateInfoPage';
import NewPostPage from './pages/WallMainPage/NewPostPage';
import useAuthStore from './stores/useAuthStore';
import useCachedUser from './reactQuery/hooks/user/useCachedUser';
import {
  disconnectSocket,
  initiateSocketConnection,
  subscribeToLikes,
  subscribeToUnreadNotification,
} from './services/socket';
import useNotificationStore from './stores/useNotificationStore';
import useAutoAuth from './reactQuery/hooks/useAutoAuth';

function App() {
  const { isLogin } = useAuthStore();
  const { setUnreadNotifications } = useNotificationStore();
  const userInfo = useCachedUser();

  useAutoAuth();

  useEffect(() => {
    if (userInfo?._id) {
      initiateSocketConnection(userInfo?._id);
      subscribeToLikes((scoketData) => {
        console.log('socketData', scoketData);
        // alert(`Your post was liked by ${scoketData.username}`);
      });
      subscribeToUnreadNotification((unreadNotifications) => {
        console.log('unreadNotifications', unreadNotifications);
        setUnreadNotifications(unreadNotifications);
      });
    }
    return () => {
      disconnectSocket();
    };
  }, [userInfo?._id, setUnreadNotifications]);

  return (
    <Routes>
      <Route path='/' element={<LayoutPage />}>
        <Route
          path=''
          element={
            <PrivateRoute isLogin={isLogin}>
              <WallMainPage />
            </PrivateRoute>
          }
        >
          <Route path='' element={<WallPage />} />
          <Route path=':userId' element={<WallPage />} />
          <Route path='newPost' element={<NewPostPage />} />
          <Route path='user/updateInfo' element={<UpdateInfoPage />} />
        </Route>
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
  );
}

const PrivateRoute = ({
  children,
  isLogin,
}: {
  children: ReactNode;
  isLogin: boolean;
}) => (isLogin ? children : <Navigate to='/'></Navigate>);

export default App;
