import { useState } from 'react';
import { useReducer } from 'react';
import formReducer from '../../reducers/formReducer';
import initialLoginFormState from '../../reducers/initialLoginFormState';
import Input from '../../components/form/Input';

import useAuth from '../../hooks/useAuth';

function Login() {
  const [fetchData, setFetchData] = useState(null);
  const auth = useAuth();
  const [formState, dispatch] = useReducer(formReducer, initialLoginFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const loginData = await auth.loginAction(data);
    setFetchData(loginData);
  };

  const handleInputChange = (e) => {
    dispatch({
      type: 'handle input change',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <>
      {!auth.token ? (
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={formState.username}
            onChange={handleInputChange}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            value={formState.password}
            onChange={handleInputChange}
          />
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
