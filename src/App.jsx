import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';

import fetchRequest from './components/FetchBlogApi/fetchRequest';

function App() {
  const [posts, setPosts] = useState([]);

  const [user, setUser] = useState({});

  const currentToken = localStorage.getItem('token');
  const [token, setToken] = useState(currentToken);

  useEffect(() => {
    if (token) {
      const postApi = async () => {
        try {
          const res = await fetch(`http://localhost:3000/user`, {
            headers: {
              Authorization: token,
            },
          });
          const data = await res.json();

          setUser(data);
        } catch (err) {
          console.log(err.name);
        }
      };
      postApi();
    }
    return () => {
      setUser([]);
    };
  }, [token]);

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
      <Header token={token} setToken={setToken} user={user} />
      <Outlet context={[posts, token, setToken, user]} />
    </div>
  );
}

export default App;
