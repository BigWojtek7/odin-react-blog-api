import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import requestWithNativeFetch from '../../utils/fetchApiGet';

import Loader from '../../components/Loader/Loader';

function Login() {
  const [fetchData, setFetchData] = useState(false);
  const [token, setToken, , isLoading, setIsLoading] = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fetchDataForLogin = async () => {
      try {
        const options = {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
          }),
          method: 'post',
        };

        const loginData = await requestWithNativeFetch(
          `${import.meta.env.VITE_BACKEND_URL}/login`,
          options
        );
        setFetchData(loginData);
        setIsLoading(false);
        console.log(loginData);
        if (loginData.success) {
          const dataToken = loginData.token;
          localStorage.setItem('token', dataToken);
          setToken(dataToken);
          navigate('/');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForLogin();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !token ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
          <button>Log In</button>
          {fetchData && <p>{fetchData.msg}</p>}
        </form>
      ) : (
        <p>You are logged in</p>
      )}
    </>
  );
}

export default Login;
