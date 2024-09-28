import { useState, useMemo, useEffect } from 'react';
import requestWithNativeFetch from '../utils/fetchApi';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

import AuthContext from './AuthContext';
import useLoader from '../hooks/useLoader';

const AuthProvider = ({ children }) => {
  const currentToken = localStorage.getItem('token');
  const [token, setToken] = useState(currentToken || null);
  const [user, setUser] = useState(null);
  const { start: loaderStart, stop: loaderStop } = useLoader();

  const navigate = useNavigate();

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
    return () => setUser(null);
  }, [userData]);

  const loginAction = async (data) => {
    try {
      loaderStart();
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        method: 'post',
      };
      const loginData = await requestWithNativeFetch(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        options
      );

      if (loginData.success) {
        const dataToken = loginData.token;
        localStorage.setItem('token', dataToken);
        setToken(dataToken);
        navigate('/');
        return;
      }
      return loginData;
    } catch (err) {
      console.log(err);
    } finally {
      loaderStop();
    }
  };

  const signUpAction = async (data) => {
    try {
      loaderStart();
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        method: 'post',
      };
      const createUserData = await requestWithNativeFetch(
        `${import.meta.env.VITE_BACKEND_URL}/sign-up`,
        options
      );
      if (createUserData.success) {
        const dataToken = createUserData.token;
        localStorage.setItem('token', dataToken);
        setToken(dataToken);
        navigate('/');
        return;
      }
      return createUserData;
    } catch (err) {
      console.log(err);
    } finally {
      loaderStop();
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    alert('You are signed out');
  };
  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, signUpAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
