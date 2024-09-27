import { useState } from 'react';

import useAuth from '../../hooks/useAuth';

function SignUp() {
  const [fetchData, setFetchData] = useState(null);
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
      re_password: e.target.re_password.value,
    };
    const signUpData = await auth.signUpAction(data);
    setFetchData(signUpData);
  };

  return (
    <>
      {!auth.token ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
          <label htmlFor="re_password">Re-Password</label>
          <input id="re_password" name="re_password" type="password" />
          <button>Sign Up</button>
          {!fetchData?.success &&
            fetchData?.msg.map((err, index) => <p key={index}>{err.msg}</p>)}
        </form>
      ) : (
        <p>You are logged in</p>
      )}
    </>
  );
}

export default SignUp;
