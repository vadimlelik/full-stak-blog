import { Route, Routes } from 'react-router-dom';
import Layuot from './components/Layuot';
import MainPage from './pages/MainPage'
import EditPostPage from './pages/EditPostPage'
import AddPostPage from './pages/AddPostPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import PostsPage from './pages/PostsPage';
import PostPage from './pages/PostPage';



function App() {
  return (
    <Layuot>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='posts' element={<PostsPage />} />
        <Route path=':id' element={<PostPage />} />
        <Route path=':id/edit' element={<EditPostPage />} />
        <Route path='new' element={<AddPostPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='login' element={<LoginPage />} />
      </Routes>
    </Layuot>
  );
}

export default App;
