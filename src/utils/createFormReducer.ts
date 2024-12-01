import formReducer, { FormState } from "../reducers/formReducer";
import { FormAction } from "../reducers/formReducer";
import { FormRules } from "../reducers/formReducer";

function createFormReducer<T>(formRules: FormRules<T>) {
  return (
    state: FormState<T>,
    action: FormAction<T>
  ): FormState<T> => formReducer(state, action, formRules);
}

export default createFormReducer;