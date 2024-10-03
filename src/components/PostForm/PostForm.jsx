import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import requestWithNativeFetch from '../../utils/fetchApi';
import { useState, useReducer } from 'react';

import Input from '../form/Input';
import Textarea from '../form/Textarea';
import Button from '../form/Button';

import initialPostFormState from '../../reducers/initialPostFormState';
import postFormReducer from '../../reducers/reducerPostForm';
import useNotification from '../../hooks/useNotification';

function PostForm() {
  const navigate = useNavigate();
  const [createPostRes, setCreatePostRes] = useState({});
  const { token } = useAuth();
  const { addNotification } = useNotification();

  const [formState, dispatch] = useReducer(
    postFormReducer,
    initialPostFormState
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'validate' });
    if (formState.isValid) {
      try {
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
      }
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    dispatch({
      type: 'handle input change',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          label="Title"
          value={formState.title}
          onChange={handleInputChange}
          error={formState.errors.title}
        />
        <Textarea
          name="content"
          label="Content:"
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
