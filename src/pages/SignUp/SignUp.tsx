import { useState } from 'react';
import { useReducer } from 'react';
import formReducer from '../../reducers/formReducer';
import {
  initialSignUpFormState,
  signUpFormRules,
} from '../../reducers/initialSignUpFormState';
import Input from '../../components/form/Input/Input';
import useAuth from '../../contexts/Auth/useAuth';
import Button from '../../components/form/Button/Button';

interface ErrorMessage {
  msg: string;
}

interface FormResponse {
  msg: ErrorMessage[];
  success: boolean;
}

function SignUp() {
  const [formErrors, setFormErrors] = useState<FormResponse | null>(null);
  const auth = useAuth();

  const [formState, dispatch] = useReducer(
    (state, action) => formReducer(state, action, signUpFormRules),
    initialSignUpFormState
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'validate_all' });

    if (formState.isValid) {
      const data = {
        username: formState.username,
        password: formState.password,
        re_password: formState.re_password,
      };
      const signUpData = await auth.signUpAction(data);
      console.log(signUpData);
      if (signUpData && !signUpData.success) setFormErrors(signUpData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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
            autocomplete="new-password"
          />
          <Input
            name="re_password"
            type="password"
            label="Repeat Password"
            value={formState.re_password}
            onChange={handleInputChange}
            error={formState.errors.re_password}
            autocomplete="new-password"
          />
          <Button type="submit">Sign Up</Button>
          {!formErrors?.success &&
            formErrors?.msg.map((err, index) => <p key={index}>{err.msg}</p>)}
        </form>
      ) : (
        <p>You are logged in</p>
      )}
    </div>
  );
}

export default SignUp;
