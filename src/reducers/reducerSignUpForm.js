import initialSignUpFormState from './initialSignUpFormState';
function signUpFormReducer(state, action) {
  switch (action.type) {
    case 'handle input change': {
      return {
        ...state,
        [action.field]: action.payload,
        errors: { ...state.errors, [action.field]: '' },
      };
    }
    case 'validate': {
      let isValid = true;
      const errors = {};
      if (!state.username) {
        errors.username = 'Username is required';
        isValid = false;
      }
      if (!state.password) {
        errors.password = 'Password is required';
        isValid = false;
      }
      if (!state.re_password) {
        errors.re_password = 'Password is required';
        isValid = false;
      }
      return {
        ...state,
        errors,
        isValid,
      };
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
