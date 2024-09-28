import initialCommentFormState from "./initialCommentFormState";
function commentFormReducer(state, action) {
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
      if (!state.content) {
        errors.content = 'Content is required';
        isValid = false;
      }
      return {
        ...state,
        errors,
        isValid,
      };
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
