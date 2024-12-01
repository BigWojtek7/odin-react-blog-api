import formReducer, { FormAction, FormState } from './formReducer';
import validateForm from '../utils/validateForm';
import { Mock } from 'vitest';

vi.mock('../utils/validateForm');

const mockedValidateForm = validateForm as Mock;

export interface InitialFormType {
  field1: string;
  field2: string;
}

describe('formReducer', () => {
  const initialState: FormState<InitialFormType> = {
    field1: '',
    field2: '',
    errors: {
      field1: '',
      field2: '',
    },
    isTouched: { field1: false, field2: false },
    isValid: false,
  };
  const formRules = {
    /* rules definition here */
  };

  it('should handle "input_validate" action', () => {
    const action: FormAction<InitialFormType> = {
      type: 'input_validate',
      field: 'field1',
      payload: 'value1',
    };
    mockedValidateForm.mockReturnValue({
      ...initialState,
      field1: 'value1',
      isTouched: { ...initialState.isTouched, field1: true },
    });

    const result = formReducer(initialState, action, formRules);

    expect(result.field1).toBe('value1');
    expect(result.isTouched.field1).toBe(true);
    expect(validateForm).toHaveBeenCalledWith(result, formRules);
  });

  it('should handle "validate_all" action', () => {
    const action: FormAction<InitialFormType> = { type: 'validate_all' };
    const updatedState = {
      ...initialState,
      isTouched: { field1: true, field2: true },
    };
    mockedValidateForm.mockReturnValue(updatedState);

    const result = formReducer(initialState, action, formRules);

    expect(result.isTouched.field1).toBe(true);
    expect(result.isTouched.field2).toBe(true);
    expect(validateForm).toHaveBeenCalledWith(result, formRules);
  });

  it('should handle "reset_input_value" action', () => {
    const action: FormAction<InitialFormType> = {
      type: 'reset_input_value',
      initialState,
    };

    const result = formReducer(
      { ...initialState, field1: 'modified', field2: 'data' },
      action,
      formRules
    );

    expect(result).toEqual(initialState);
  });

  it('should throw error for unknown action type', () => {
    // @ts-expect-error: This is an intentional test case for an invalid action type
    const action: FormAction<InitialFormType> = { type: 'unknown_action' };

    expect(() => formReducer(initialState, action, formRules)).toThrow(
      'Unknown action: {"type":"unknown_action"}'
    );
  });
});
