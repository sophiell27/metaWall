import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutPage from './pages/LayoutPage/LayoutPage';
import WallMainPage from './pages/WallMainPage/WallMainPage';
import WallPage from './pages/WallMainPage/WallPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import { ReactNode, useEffect } from 'react';
import { isTokenExpired } from './pages/LayoutPage/util';
import UpdateInfoPage from './pages/UpdateInfoPage/UpdateInfoPage';
import NewPostPage from './pages/WallMainPage/NewPostPage';
import useAuthStore from './stores/useAuthStore';
import useUser from './reactQuery/hooks/user/useUser';
import useCachedUser from './reactQuery/hooks/user/useCachedUser';
import {
  disconnectSocket,
  initiateSocketConnection,
  subscribeToLikes,
  subscribeToUnreadNotification,
} from './services/socket';
import useNotificationStore from './stores/useNotificationStore';

function App() {
  const { login, isLogin } = useAuthStore();
  const { setUnreadNotifications } = useNotificationStore();
  const userInfo = useCachedUser();
  useUser(isLogin);
  useEffect(() => {
    const checkAuth = () => {
      const token = window.sessionStorage.getItem('token');
      const id = window.sessionStorage.getItem('id');
      if (token && id) {
        const isExpired = isTokenExpired(token);
        if (!isExpired) {
          login(token, id);
        }
      }
    };
    checkAuth();
  }, [login]);

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
