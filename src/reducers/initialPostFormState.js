const initialPostFormState = {
  title: '',
  content: '',
  errors: {
    title: '',
    content: '',
  },
  isTouched: {
    title: false,
    content: false,
  },
  isValid: false,
};

export default initialPostFormState;
