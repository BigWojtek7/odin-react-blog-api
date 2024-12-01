import { FormRules, FormState } from './formReducer';

export interface InitialPostFormType {
  title: string;
  content: string;
}

export const initialPostFormState: FormState<InitialPostFormType> = {
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

export const postFormRules: FormRules<InitialPostFormType> = {
  title: { required: true },
  content: { required: true },
};
