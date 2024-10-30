import { useParams } from 'react-router-dom';

import requestWithNativeFetch from '../../utils/requestWithNativeFetch';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

import Textarea from '../form/Textarea/Textarea';
import Button from '../form/Button/Button';

import {
  initialCommentFormState,
  commentFormRules,
} from '../../reducers/initialCommentFormState';
import { useReducer } from 'react';
import formReducer from '../../reducers/formReducer';
import useNotification from '../../hooks/useNotification';

function CommentsForm({ setComments }) {
  const [createCommentRes, setCreteCommentRes] = useState({});
  const { postid } = useParams();
  const { token } = useAuth();
  const { addNotification } = useNotification();

  const [formState, dispatch] = useReducer(
    (state, action) => formReducer(state, action, commentFormRules),
    initialCommentFormState
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'validate_all' });
    if (formState.isValid) {
      try {
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            content: formState.content,
          }),
          method: 'post',
        };

        const createCommentData = await requestWithNativeFetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/${postid}/comments`,
          options
        );
        setCreteCommentRes(createCommentData);
        if (createCommentData.success) {
          setComments((prevComments) => [
            {
              id: createCommentData.data.id,
              user_id: createCommentData.data.user_id,
              post_id: createCommentData.data.post_id,
              content: createCommentData.data.content,
              date_format: createCommentData.data.date_format,
              username: createCommentData.data.username,
            },
            ...prevComments,
          ]);
          dispatch({
            type: 'reset_input_value',
            initialState: initialCommentFormState,
          });
          addNotification('the comment has been created', 'success');
        }
      } catch (err) {
        console.log(err.name);
      }
    }
  };

  const handleInputChange = (e) => {
    dispatch({
      type: 'input_validate',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <div className="commentSubmit">
      {token ? (
        <>
          <form onSubmit={handleSubmit} role="form">
            <Textarea
              name="content"
              label="Content"
              value={formState.content}
              onChange={handleInputChange}
              error={formState.errors.content}
            />
            <Button>Submit</Button>
          </form>
          {!createCommentRes?.success &&
            createCommentRes?.msg?.map((err, index) => (
              <p key={index}>{err.msg}</p>
            ))}
        </>
      ) : (
        <p>
          <strong>To add comment You must log in first!</strong>
        </p>
      )}
    </div>
  );
}

export default CommentsForm;
