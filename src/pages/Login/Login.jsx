import { useState } from 'react';

import useAuth from '../../hooks/useAuth';

function Login() {
  const [fetchData, setFetchData] = useState(null);
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const loginData = await auth.loginAction(data);
    setFetchData(loginData)
    console.log(loginData)
  };

  return (
    <>
      {!auth.token ? (
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
