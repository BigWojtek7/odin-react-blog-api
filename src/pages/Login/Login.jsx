import { useState } from 'react';
import { useReducer } from 'react';
import formReducer from '../../reducers/formReducer';
import {
  initialLoginFormState,
  loginFormRules,
} from '../../reducers/initialLoginFormState';
import Input from '../../components/form/Input/Input';
import Button from '../../components/form/Button/Button';

import useAuth from '../../hooks/useAuth';

function Login() {
  const [fetchData, setFetchData] = useState(null);
  const auth = useAuth();
  const [formState, dispatch] = useReducer(
    (state, action) => formReducer(state, action, loginFormRules),
    initialLoginFormState
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'validate_all',
    });
    if (formState.isValid) {
      const data = {
        username: formState.username,
        password: formState.password,
      };
      const loginData = await auth.loginAction(data);
      setFetchData(loginData);
    }
  };

  const handleInputChange = (e) => {
    dispatch({
      type: 'input_validate',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <div>
      {!auth.token ? (
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={formState.username}
            onChange={handleInputChange}
            error={formState.errors.username}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            value={formState.password}
            onChange={handleInputChange}
            error={formState.errors.password}
            autocomplete="current-password"
          />
          <Button>Log In</Button>
          {fetchData && <p>{fetchData.msg}</p>}
        </form>
      ) : (
        <p>You are logged in</p>
      )}
    </div>
  );
}

export default Login;
