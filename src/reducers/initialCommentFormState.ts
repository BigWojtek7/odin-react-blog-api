import { FormRules, FormState } from './formReducer';

export interface InitialCommentFormType {
  content: string;
}

export const initialCommentFormState: FormState<InitialCommentFormType> = {
  content: '',
  errors: { content: '' },
  isTouched: { content: false },
  isValid: false,
};

export const commentFormRules: FormRules<InitialCommentFormType> = {
  content: { required: true },
};
