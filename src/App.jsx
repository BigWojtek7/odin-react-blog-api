import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';

import fetchRequest from './components/FetchBlogApi/fetchRequest';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postApi = async () => {
      const data = await fetchRequest('http://localhost:3000/posts');
      setPosts(data);
    };
    postApi()
    return () => {
      setPosts([]);
    };
  }, []);
  return (
    <div className="content">
      <Header />
      <Outlet context={posts} />
    </div>
  );
}

export default App;
