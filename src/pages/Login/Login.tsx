import { useState } from 'react';
import { useReducer } from 'react';
import formReducer from '../../reducers/formReducer';
import {
  initialLoginFormState,
  loginFormRules,
} from '../../reducers/initialLoginFormState';
import Input from '../../components/form/Input/Input';
import Button from '../../components/form/Button/Button';

import useAuth from '../../contexts/Auth/useAuth';

import styles from './Login.module.css';

function Login() {
  const [fetchData, setFetchData] = useState(null);
  const auth = useAuth();
  const [formState, dispatch] = useReducer(
    (state, action) => formReducer(state, action, loginFormRules),
    initialLoginFormState
  );

  const handleLogin = async () => {
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

  const handleDemoLogin = async (role: string) => {
    const demoCredentials =
      role === 'admin'
        ? { username: 'admin', password: 'admin' }
        : { username: 'user', password: 'user' };

    await auth.loginAction(demoCredentials);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'input_validate',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <div>
      {!auth.token ? (
        <>
          <form onSubmit={handleLogin}>
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
            <Button type="submit">Log In</Button>
            {fetchData && <p>{fetchData.msg}</p>}{' '}
          </form>

          <div className={styles.demoLogin}>
            <p className={styles.demoInfo}>
              Want to test the application? Use the demo accounts: Demo User and
              Demo Admin.
            </p>
            <div className={styles.demoButtons}>
              <Button onClick={() => handleDemoLogin('user')}>Demo User</Button>
              <Button onClick={() => handleDemoLogin('admin')}>
                Demo Admin
              </Button>
            </div>
          </div>
        </>
      ) : (
        <p>You are logged in</p>
      )}
    </div>
  );
}

export default Login;
