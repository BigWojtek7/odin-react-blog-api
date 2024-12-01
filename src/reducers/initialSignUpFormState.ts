import { FormRules, FormState } from './formReducer';

export interface InitialSignUpFormType {
  username: string;
  password: string;
  re_password: string;
}

export const initialSignUpFormState: FormState<InitialSignUpFormType> = {
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

export const signUpFormRules: FormRules<InitialSignUpFormType> = {
  username: { required: true },
  password: { required: true },
  re_password: { required: true, match: 'password' },
};
