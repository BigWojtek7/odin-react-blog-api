const validateForm = (state, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach((field) => {
    const value = state[field];
    const rule = rules[field];

    if (rule.required && !value && state.isTouched[field]) {
      errors[field] = `${field} is required`;
      isValid = false;
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors[
        field
      ] = `${field} must be at least ${rule.minLength} characters long`;
      isValid = false;
    }
    if (!state.isTouched[field]) {
      isValid = false;
    }
  });
  return {
    ...state,
    errors,
    isValid,
  };
};

export default validateForm;
