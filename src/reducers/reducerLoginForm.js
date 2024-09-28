import initialLoginFormState from "./initialLoginFormState";
function loginFormReducer(state, action) {
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
      return {
        ...state,
        errors,
        isValid,
      };
    }
    case 'reset input value': {
      return initialLoginFormState;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default loginFormReducer;
