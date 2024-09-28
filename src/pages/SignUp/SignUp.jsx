import { useState } from 'react';
import { useReducer } from 'react';
import formReducer from '../../reducers/formReducer';
import initialSignUpFormState from '../../reducers/initialSignUpFormState';
import Input from '../../components/form/Input';
import useAuth from '../../hooks/useAuth';

function SignUp() {
  const [fetchData, setFetchData] = useState(null);
  const auth = useAuth();

  const [formState, dispatch] = useReducer(formReducer, initialSignUpFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: formState.username,
      password: formState.password,
      re_password: formState.re_password,
    };
    const signUpData = await auth.signUpAction(data);
    setFetchData(signUpData);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
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
          <Input
            name="re_password"
            type="password"
            label="Repeat Password"
            value={formState.re_password}
            onChange={handleInputChange}
          />

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
