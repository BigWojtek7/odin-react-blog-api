import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';

import fetchRequest from './components/FetchBlogApi/fetchRequest';

function App() {
  const [posts, setPosts] = useState([]);

  const currentToken = localStorage.getItem('token');
  const [token, setToken] = useState(currentToken);

  console.log(token, 'hahaha');

  // useEffect(() => {
  //   setToken(currentToken);
  //   console.log(token, 'hahaha')
  // }, [currentToken]);


  
  useEffect(() => {
    const postApi = async () => {
      const data = await fetchRequest('http://localhost:3000/posts');
      setPosts(data);
    };
    postApi();
    return () => {
      setPosts([]);
    };
  }, []);
  return (
    <div className="content">
      <Header token = {token} setToken={setToken}/>
      <Outlet context={[posts, token, setToken]} />
    </div>
  );
}

export default App;
