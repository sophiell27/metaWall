import './App.css';
import { Route, Routes } from 'react-router-dom';
import CreatePost from './pages/WallMainPage/CreatePostPage.tsx';
import WallMainView from './pages/WallMainPage/WallMainPage.tsx';
import Wall from './pages/WallMainPage/WallPage.tsx';
import LoginView from './pages/LoginPage/LoginPage.tsx';
import LayoutPage from './pages/LayoutPage/LayoutPage.tsx';

function App() {
  return (
    <Routes>
      <Route path='/metaWall' element={<LayoutPage />}>
        <Route path='' element={<WallMainView />}>
          <Route path='' element={<Wall />} />
          <Route path='newPost' element={<CreatePost />} />
        </Route>
      </Route>
      <Route path='/metaWall/login' element={<LoginView />}></Route>
    </Routes>
  );
}

export default App;
