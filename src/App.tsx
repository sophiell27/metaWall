import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutPage from './pages/LayoutPage/LayoutPage';
import WallMainPage from './pages/WallMainPage/WallMainPage';
import WallPage from './pages/WallMainPage/WallPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import { useEffect } from 'react';
import { isTokenExpired } from './pages/LayoutPage/util';
import UpdateInfoPage from './pages/UpdateInfoPage/UpdateInfoPage';
import NewPostPage from './pages/WallMainPage/NewPostPage';
import useUserStore from './stores/useUserStore';

function App() {
  const { setLogin } = useUserStore();

  useEffect(() => {
    const checkAuth = () => {
      const token = window.sessionStorage.getItem('token');
      if (token) {
        const isExpired = isTokenExpired(token);
        if (!isExpired) {
          setLogin(true);
        }
      }
    };
    checkAuth();
  }, [setLogin]);

  return (
    <Routes>
      <Route path='/' element={<LayoutPage />}>
        <Route path='' element={<WallMainPage />}>
          <Route path='' element={<WallPage />} />
          <Route path='newPost' element={<NewPostPage />} />
          <Route path='user/updateInfo' element={<UpdateInfoPage />} />
        </Route>
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </Routes>
  );
}

export default App;
