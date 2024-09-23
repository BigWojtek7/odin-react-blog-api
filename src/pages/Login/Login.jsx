import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

function Login() {
  const [fetchData, setFetchData] = useState(false);
  const [token, setToken, , isLoading, setIsLoading] = useOutletContext();
  const navigate = useNavigate();

  const auth = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    auth.loginAction(data);
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
