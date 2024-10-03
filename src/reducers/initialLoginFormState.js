const initialLoginFormState = {
  username: '',
  password: '',
  errors: {
    username: '',
    password: '',
  },
  isTouched: {
    username: false,
    password: false,
  },
  isValid: false,
};
export default initialLoginFormState;
