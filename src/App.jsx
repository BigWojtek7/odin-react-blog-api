import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import getRequestWithNativeFetch from './utils/fetchApiGet';
import { Outlet } from 'react-router-dom';

function App() {
  const [user, setUser] = useState({});

  const [isLoading, setIsLoading] = useState(false)

  const currentToken = localStorage.getItem('token');
  const [token, setToken] = useState(currentToken);

  useEffect(() => {
    if (token) {
      const fetchDataForUsers = async () => {
        try {
          const url = `${import.meta.env.VITE_BACKEND_URL}/user`;
          const headers = {
            Authorization: token,
          };
          const userData = await getRequestWithNativeFetch(url, headers);
          setUser(userData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForUsers();
    }
    return () => {
      setUser([]);
    };
  }, [token]);


  return (
    <div className="content">
      <Header token={token} setToken={setToken} user={user} />
      <Outlet context={[token, setToken, user, isLoading, setIsLoading]} />
    </div>
  );
}

export default App;
