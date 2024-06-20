import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout.tsx';
import CreatePost from './components/WallView/CreatePost.tsx';
import WallMainView from './components/WallView/WallMainView.tsx';
import Wall from './components/WallView/Wall.tsx';

function App() {
  return (
    <Routes>
      <Route path='/metaWall-w4' element={<Layout />}>
        <Route path='' element={<WallMainView />}>
          <Route path='' element={<Wall />} />
          <Route path='newPost' element={<CreatePost />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
