import { FormRules, FormState } from '../reducers/formReducer';

const validateForm = <T extends Record<string, any>>(
  state: FormState<T>,
  rules: FormRules<T>
): FormState<T> => {
  const errors: Partial<Record<keyof T, string>> = {};
  let isValid = true;

  for (const field in rules) {
    const value = state[field];
    const rule = rules[field];

    if (!rule) continue;

    if (rule.required && !value && state.isTouched[field]) {
      errors[field] = `${
        field === 're_password' ? 'Password confirmation' : field
      } is required`;
      isValid = false;
    } else if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `${String(field)} must be at least ${
        rule.minLength
      } characters long`;
      isValid = false;
    } else if (rule.match && value !== state[rule.match]) {
      errors[field] = 'Passwords do not match';
      isValid = false;
    }

    if (!state.isTouched[field]) {
      isValid = false;
    }
  }

  return {
    ...state,
    errors: errors as Record<keyof T, string>,
    isValid,
  };
};

export default validateForm;
