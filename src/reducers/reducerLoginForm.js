import initialLoginFormState from "./initialLoginFormState";
function loginFormReducer(state, action) {
  switch (action.type) {
    case 'handle input change': {
      let isValid = true;
      const errors = {};
      const newState = {
        ...state,
        [action.field]: action.payload,
      }
      if (!newState.username) {
        errors.username = 'Username is required';
        isValid = false;
      }
      if (!newState.password) {
        errors.password = 'Password is required';
        isValid = false;
      }

      return {
        ...newState,
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
