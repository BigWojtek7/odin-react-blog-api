import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import useFetch from '../hooks/useFetch';
import { useEffect, useMemo, useState } from 'react';

function MainLayout() {
  const [user, setUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const currentToken = localStorage.getItem('token');
  const [token, setToken] = useState(currentToken);
  const options = useMemo(
    () => ({
      headers: {
        Authorization: token,
      },
    }),
    [token]
  );

  const {
    fetchData: userData,
    // error,
    // loading,
  } = useFetch(
    token ? `${import.meta.env.VITE_BACKEND_URL}/user` : null,
    options
  );

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
    return () => setUser({});
  }, [userData]);
  return (
    <div className="content">
      <Header token={token} setToken={setToken} user={user} />
      <main>
        <Outlet context={[token, setToken, user, isLoading, setIsLoading]} />
      </main>
    </div>
  );
}
export default MainLayout;
