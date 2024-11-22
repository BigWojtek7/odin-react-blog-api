export const initialSignUpFormState = {
  username: '',
  password: '',
  re_password: '',
  errors: {
    username: '',
    password: '',
    re_password: '',
  },
  isTouched: {
    username: false,
    password: false,
    re_password: false,
  },
  isValid: false,
};

export const signUpFormRules = {
  username: { required: true },
  password: { required: true },
  re_password: { required: true, match: 'password' },
};
