import './App.css';
// import Header from './components/Wall/Layout/Header.tsx';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
import CreatePost from './components/Wall/CreatePost.tsx';
import WallMain from './components/Wall/WallMain.tsx';
import Wall from './components/Wall/Wall.tsx';

function App() {
  return (
    <Routes>
      <Route path='/metaWall-w4' element={<Layout />}>
        <Route path='' element={<WallMain />}>
          <Route path='' element={<Wall />} />
          <Route path='newPost' element={<CreatePost />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
