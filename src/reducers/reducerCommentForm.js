import initialCommentFormState from './initialCommentFormState';
import validateForm from '../utils/validateForm';

const postFormRules = {
  content: { required: true },
};

function commentFormReducer(state, action) {
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
        isTouched: { content: true },
      };
      return validateForm(updatedState, postFormRules);
    }

    case 'reset input value': {
      return initialCommentFormState;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default commentFormReducer;
