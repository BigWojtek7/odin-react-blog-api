import { FormAction } from '../reducers/formReducer';

export const handleInputChange = <T extends object>(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  dispatch: React.Dispatch<FormAction<T>>
) => {
  const name = e.target.name as keyof T;
  const value = e.target.value;

  dispatch({
    type: 'input_validate',
    field: name,
    payload: value as T[keyof T],
  });
};

export default handleInputChange;
