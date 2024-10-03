import initialLoginFormState from './initialLoginFormState';
import validateForm from '../utils/validateForm';

const loginFormRules = {
  username: { required: true },
  password: { required: true },
};

function loginFormReducer(state, action) {
  switch (action.type) {
    case 'input validate': {
      const updatedState = {
        ...state,
        [action.field]: action.payload,
        isTouched: { ...state.isTouched, [action.field]: true },
      };
      return validateForm(updatedState, loginFormRules);
    }
    case 'validate all': {
      const updatedState = {
        ...state,
        isTouched: { username: true, password: true },
      };
      return validateForm(updatedState, loginFormRules);
    }

    case 'reset input value': {
      return initialLoginFormState;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

// const validateState = (state) => {
//   let isValid = true;
//   const errors = {};
//   if (!state.username && state.isTouched.username) {
//     errors.username = 'Username is required';
//     isValid = false;
//   }
//   if (!state.password && state.isTouched.password) {
//     errors.password = 'Password is required';

//     isValid = false;
//   }
//   if (!state.isTouched.username || !state.isTouched.password) {
//     isValid = false;
//   }
//   console.log(isValid);
//   return {
//     ...state,
//     errors,
//     isValid,
//   };
// };

export default loginFormReducer;
