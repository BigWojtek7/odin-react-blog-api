import initialPostFormState from './initialPostFormState';
import validateForm from '../utils/validateForm';

const postFormRules = {
  title: { required: true },
  content: { required: true },
};

function postFormReducer(state, action) {
  switch (action.type) {
    case 'input validate': {
      const updatedState = {
        ...state,
        [action.field]: action.payload,
        isTouched: { ...state.isTouched, [action.field]: true },
      };
      return validateForm(updatedState, postFormRules);
    }
    case 'validate all': {
      const updatedState = {
        ...state,
        isTouched: { title: true, content: true },
      };
      return validateForm(updatedState, postFormRules);
    }

    case 'reset input value': {
      return initialPostFormState;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default postFormReducer;
