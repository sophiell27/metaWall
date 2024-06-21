import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutPage from './pages/LayoutPage/LayoutPage';
import WallMainPage from './pages/WallMainPage/WallMainPage';
import WallPage from './pages/WallMainPage/WallPage';
import CreatePostPage from './pages/WallMainPage/CreatePostPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';

function App() {
  return (
    <Routes>
      <Route path='/metaWall' element={<LayoutPage />}>
        <Route path='' element={<WallMainPage />}>
          <Route path='' element={<WallPage />} />
          <Route path='newPost' element={<CreatePostPage />} />
        </Route>
      </Route>
      <Route path='/metaWall/login' element={<LoginPage />} />
      <Route path='/metaWall/signup' element={<SignupPage />} />
    </Routes>
  );
}

export default App;
