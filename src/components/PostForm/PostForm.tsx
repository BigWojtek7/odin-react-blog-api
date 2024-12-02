import { useNavigate } from 'react-router-dom';
import useAuth from '../../contexts/Auth/useAuth';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';
import { useState, useReducer } from 'react';

import Input from '../form/Input/Input';
import Textarea from '../form/Textarea/Textarea';
import Button from '../form/Button/Button';
import {
  initialPostFormState,
  InitialPostFormType,
  postFormRules,
} from '../../reducers/initialPostFormState';
import useNotification from '../../contexts/Notification/useNotification';
import useLoader from '../../contexts/Loader/useLoader';
import { CreateResType } from '../../types/SharedInterfaces';
import createFormReducer from '../../utils/createFormReducer';
import handleInputChange from '../../utils/handleInputChange';

function PostForm() {
  const navigate = useNavigate();
  const [createPostRes, setCreatePostRes] = useState<CreateResType | null>(
    null
  );
  const { token } = useAuth();
  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();

  const postFormReducer = createFormReducer<InitialPostFormType>(postFormRules);

  const [formState, dispatch] = useReducer(
    postFormReducer,
    initialPostFormState
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'validate_all' });
    if (formState.isValid) {
      try {
        loaderStart();
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token || '',
          },
          body: JSON.stringify({
            title: formState.title,
            content: formState.content,
          }),
          method: 'post',
        };
        const createPostDate = await requestWithNativeFetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/`,
          options
        );
        setCreatePostRes(createPostDate);
        if (createPostDate.success) {
          addNotification('The post has been created', 'success');
          navigate('/');
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.name);
          console.log(err.message);
        } else {
          console.log('Nieznany błąd', err);
        }
      } finally {
        loaderStop();
      }
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    handleInputChange<InitialPostFormType>(e, dispatch);
  };

  return (
    <>
      <form onSubmit={handleSubmit} role="form">
        <Input
          name="title"
          label="Title"
          value={formState.title}
          onChange={handleChange}
          error={formState.errors.title}
        />
        <Textarea
          name="content"
          label="Content"
          value={formState.content}
          onChange={handleChange}
          error={formState.errors.content}
        />
        <Button type="submit">Submit</Button>
      </form>
      {!createPostRes?.success &&
        createPostRes?.msg?.map((err, index) => <p key={index}>{err.msg}</p>)}
    </>
  );
}
export default PostForm;
