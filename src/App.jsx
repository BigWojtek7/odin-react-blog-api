import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';


function App() {

  const [user, setUser] = useState({});

  
  const currentToken = localStorage.getItem('token');
  const [token, setToken] = useState(currentToken);

  useEffect(() => {
    if (token) {
      const postApi = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
            headers: {
              Authorization: token,
            },
          });
          const data = await res.json();
          console.log(data)
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

  return (
    <div className="content">
      <Header token={token} setToken={setToken} user={user} />
      <Outlet context={[token, setToken, user]} />
    </div>
  );
}

export default App;
