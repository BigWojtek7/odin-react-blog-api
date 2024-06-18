import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';

import fetchRequest from './FetchBlogApi/fetchRequest';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postApi = async () =>
      await fetchRequest('http://localhost:3000/posts');
    setPosts(postApi);
    return () => {
      setPosts([]);
    };
  }, []);
  return (
    <div className="content">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
