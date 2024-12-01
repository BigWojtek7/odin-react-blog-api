import { useEffect, useState } from 'react';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';
import { useNavigate } from 'react-router-dom';

import AuthContext from './AuthContext';
import useLoader from '../Loader/useLoader';
import useNotification from '../Notification/useNotification';

import { ChildrenProps, User } from '../../types/SharedInterfaces';

interface LoginData {
  username: string;
  password: string;
}

interface SignUpData extends LoginData {
  re_password: string;
}

const AuthProvider = ({ children }: ChildrenProps) => {
  const currentToken = localStorage.getItem('token');
  const [token, setToken] = useState(currentToken || null);
  const [user, setUser] = useState<User | null>(null);
  const { start: loaderStart, stop: loaderStop } = useLoader();
  const { addNotification } = useNotification();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const url = `${import.meta.env.VITE_BACKEND_URL}/user`;
      const options = {
        headers: {
          Authorization: token || '',
        },
      };
      let ignore = false;
      const fetchForData = async () => {
        try {
          loaderStart();
          const response = await requestWithNativeFetch(url, options);
          if (!ignore) {
            setUser(response);
          }
        } catch (err) {
          console.log(err);
        } finally {
          loaderStop();
        }
      };
      fetchForData();
      return () => {
        ignore = true;
      };
    }
  }, [loaderStart, loaderStop, token]);

  const loginAction = async (data: LoginData) => {
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
        addNotification('You have been successfully logged in', 'success');
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

  const signUpAction = async (data: SignUpData) => {
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
        addNotification('user has been created', 'success');
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
    addNotification('You have been logged out', 'success');
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
