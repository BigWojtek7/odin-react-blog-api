import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import MainLayout from './layouts/MainLayout';
import AuthProvider from './hooks/AuthProvider';

function App() {
  // const [user, setUser] = useState({});

  // const [isLoading, setIsLoading] = useState(false);

  // const currentToken = localStorage.getItem('token');
  // const [token, setToken] = useState(currentToken);
  // const options = useMemo(
  //   () => ({
  //     headers: {
  //       Authorization: token,
  //     },
  //   }),
  //   [token]
  // );

  // const {
  //   fetchData: userData,
  //   // error,
  //   // loading,
  // } = useFetch(
  //   token ? `${import.meta.env.VITE_BACKEND_URL}/user` : null,
  //   options
  // );

  // useEffect(() => {
  //   if (userData) {
  //     setUser(userData);
  //   }
  //   return () => setUser({});
  // }, [userData]);

  return (
    <>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </>
    // <div className="content">
    //   <Header token={token} setToken={setToken} user={user} />
    //   <Outlet context={[token, setToken, user, isLoading, setIsLoading]} />
    // </div>
  );
}

export default App;
