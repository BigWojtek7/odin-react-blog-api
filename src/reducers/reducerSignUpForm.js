import initialSignUpFormState from './initialSignUpFormState';
import validateForm from '../utils/validateForm';

const signUpFormRules = {
  username: { required: true },
  password: { required: true },
  re_password: { required: true, match: 'password' },
};

function signUpFormReducer(state, action) {
  switch (action.type) {
    case 'input validate': {
      const updatedState = {
        ...state,
        [action.field]: action.payload,
        isTouched: { ...state.isTouched, [action.field]: true },
      };
      return validateForm(updatedState, signUpFormRules);
    }
    case 'validate all': {
      const updatedState = {
        ...state,
        isTouched: { username: true, password: true, re_password: true },
      };
      return validateForm(updatedState, signUpFormRules);
    }

    case 'reset input value': {
      return initialSignUpFormState;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default signUpFormReducer;
