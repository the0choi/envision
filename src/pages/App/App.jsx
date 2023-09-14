import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import UserPage from '../UserPage/UserPage';
import NewPostPage from '../NewPostPage/NewPostPage';
import ShowPostPage from '../ShowPostPage/ShowPostPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <div className="w-screen h-screen fixed bg-gray-900 -z-20"></div>
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users/:id" element={<UserPage />} />
              <Route path="/posts/new" element={<NewPostPage />} />
              <Route path="/posts/:id" element={<ShowPostPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
