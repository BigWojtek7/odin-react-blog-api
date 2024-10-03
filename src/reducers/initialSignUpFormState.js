const initialSignUpFormState = {
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

export default initialSignUpFormState;
