import { useNavigate } from 'react-router-dom';
import useAuth from '../../contexts/Auth/useAuth';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';
import { useState, useReducer } from 'react';

import Input from '../form/Input/Input';
import Textarea from '../form/Textarea/Textarea';
import Button from '../form/Button/Button';
import {
  initialPostFormState,
  postFormRules,
} from '../../reducers/initialPostFormState';
import formReducer from '../../reducers/formReducer';
import useNotification from '../../contexts/Notification/useNotification';
import useLoader from '../../contexts/Loader/useLoader';
import { CreateResType } from '../../types/SharedInterfaces';

function PostForm() {
  const navigate = useNavigate();
  const [createPostRes, setCreatePostRes] = useState<CreateResType | null>(
    null
  );
  const { token } = useAuth();
  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();

  const [formState, dispatch] = useReducer(
    (state, action) => formReducer(state, action, postFormRules),
    initialPostFormState
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'validate_all' });
    if (formState.isValid) {
      try {
        loaderStart();
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
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
        console.log(err.name);
      } finally {
        loaderStop();
      }
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    dispatch({
      type: 'input_validate',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} role="form">
        <Input
          name="title"
          label="Title"
          value={formState.title}
          onChange={handleInputChange}
          error={formState.errors.title}
        />
        <Textarea
          name="content"
          label="Content"
          value={formState.content}
          onChange={handleInputChange}
          error={formState.errors.content}
        />
        <Button>Submit</Button>
      </form>
      {!createPostRes?.success &&
        createPostRes?.msg?.map((err, index) => <p key={index}>{err.msg}</p>)}
    </>
  );
}
export default PostForm;
