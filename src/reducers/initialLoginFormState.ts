import { FormRules, FormState } from './formReducer';

export interface InitialLoginFormType {
  username: string;
  password: string;
}

export const initialLoginFormState: FormState<InitialLoginFormType> = {
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

export const loginFormRules: FormRules<InitialLoginFormType> = {
  username: { required: true },
  password: { required: true },
};
