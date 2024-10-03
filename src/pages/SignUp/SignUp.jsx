import { useState } from 'react';
import { useReducer } from 'react';
import signUpFormReducer from '../../reducers/reducerSignUpForm';
import initialSignUpFormState from '../../reducers/initialSignUpFormState';
import Input from '../../components/form/Input';
import useAuth from '../../hooks/useAuth';
import Button from '../../components/form/Button';

function SignUp() {
  const [fetchData, setFetchData] = useState(null);
  const auth = useAuth();

  const [formState, dispatch] = useReducer(
    signUpFormReducer,
    initialSignUpFormState
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'validate all' });

    if (formState.isValid) {
      const data = {
        username: formState.username,
        password: formState.password,
        re_password: formState.re_password,
      };
      const signUpData = await auth.signUpAction(data);
      setFetchData(signUpData);
    }
  };

  console.log(formState)
  const handleInputChange = (e) => {
    e.preventDefault();
    dispatch({
      type: 'input validate',
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
            error={formState.errors.username}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            value={formState.password}
            onChange={handleInputChange}
            error={formState.errors.password}
          />
          <Input
            name="re_password"
            type="password"
            label="Repeat Password"
            value={formState.re_password}
            onChange={handleInputChange}
            error={formState.errors.re_password}
          />
          <Button>Sign Up</Button>
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
