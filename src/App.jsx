import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import getRequestWithNativeFetch from './utils/fetchApiGet';
import { Outlet } from 'react-router-dom';
import useFetch1 from './utils/useFetch';

function App() {
  const [user, setUser] = useState({});

  const [isLoading, setIsLoading] = useState(false)

  const currentToken = localStorage.getItem('token');
  const [token, setToken] = useState(currentToken);
  const fetchOptions = useMemo(() => ({
    headers: {
      Authorization: token,
    },
  }), [token]);



  const { fetchData: userData, error, loading } = useFetch1(
    token ? `${import.meta.env.VITE_BACKEND_URL}/user` : null, fetchOptions // Tylko wywołanie, jeśli token istnieje
  );

  useEffect(() => {
    if (userData) {
      setUser(userData); // Ustawienie danych użytkownika po pobraniu
    }
    return () => setUser({}); // Czyszczenie stanu użytkownika na unmount
  }, [userData]);


  return (
    <div className="content">
      <Header token={token} setToken={setToken} user={user} />
      <Outlet context={[token, setToken, user, isLoading, setIsLoading]} />
    </div>
  );
}

export default App;
