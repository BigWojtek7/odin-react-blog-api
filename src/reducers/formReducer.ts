import validateForm from '../utils/validateForm';

export type FormState<T> = {
  isTouched: Record<keyof T, boolean>;
  errors: Record<keyof T, string>;
  isValid: boolean;
} & T;

export type FormAction<T> =
  | { type: 'input_validate'; field: keyof T; payload: T[keyof T] }
  | { type: 'validate_all' }
  | { type: 'reset_input_value'; initialState: FormState<T> };

export type FormRules<T> = Partial<
  Record<
    keyof T,
    {
      required?: boolean;
      match?: string ;
      minLength?: number;
    }
  >
>;

function formReducer<T>(
  state: FormState<T>,
  action: FormAction<T>,
  formRules: FormRules<T>
): FormState<T> {
  switch (action.type) {
    case 'input_validate': {
      const updatedState = {
        ...state,
        [action.field]: action.payload,
        isTouched: { ...state.isTouched, [action.field]: true },
      };

      // Type casting to ensure the result of validateForm is treated as FormState<T>.
      // This is necessary to resolve the issue with the 'Record<never, boolean>' type, 
      // because TypeScript is unable to automatically infer the correct type in 
      // the case of a dynamically updated 'state' object.
      return validateForm(updatedState, formRules) as FormState<T>;
    }
    case 'validate_all': {
      const isTouched: Record<keyof T, boolean> = {} as Record<
        keyof T,
        boolean
      >;
      Object.keys(state.isTouched).forEach((field) => {
        isTouched[field as keyof T] = true;
      });

      const updatedState = {
        ...state,
        isTouched,
      };
      // Type casting for validateForm to ensure compatibility with FormState<T>.
      return validateForm(updatedState, formRules) as FormState<T>;
    }

    case 'reset_input_value': {
      return action.initialState;
    }
    default: {
      const _exhaustiveCheck: never = action;
      throw Error('Unknown action: ' + JSON.stringify(_exhaustiveCheck));
    }
  }
}

export default formReducer;
