import { useContext, createContext, useState } from 'react';
import requestWithNativeFetch from '../utils/fetchApiGet';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const currentToken = localStorage.getItem('token');
  const [token, setToken] = useState(currentToken || '');

  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
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
      // setFetchData(loginData);
      console.log(loginData);
      if (loginData.success) {
        const dataToken = loginData.token;
        localStorage.setItem('token', dataToken);
        setToken(dataToken);
        navigate('/');
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    alert('You are signed out');
  };
  return (
    <AuthContext.Provider value={{ token, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
