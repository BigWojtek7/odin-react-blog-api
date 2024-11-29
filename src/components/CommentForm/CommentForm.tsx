import { useParams } from 'react-router-dom';

import requestWithNativeFetch from '../../utils/requestWithNativeFetch';
import { useState } from 'react';
import useAuth from '../../contexts/Auth/useAuth';

import Textarea from '../form/Textarea/Textarea';
import Button from '../form/Button/Button';

import {
  initialCommentFormState,
  commentFormRules,
} from '../../reducers/initialCommentFormState';
import { useReducer } from 'react';
import formReducer from '../../reducers/formReducer';
import useNotification from '../../contexts/Notification/useNotification';
import useLoader from '../../contexts/Loader/useLoader';
import { CreateResType } from '../../types/SharedInterfaces';

import { CommentType } from '../../types/SharedInterfaces';

interface CommentFormProps {
  setComments: React.Dispatch<React.SetStateAction<CommentType[] | null>>;
}

function CommentsForm({ setComments }: CommentFormProps): JSX.Element {
  const [createCommentRes, setCreteCommentRes] = useState<CreateResType | null>(
    null
  );
  const { postid } = useParams();
  const { token } = useAuth();
  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();
  const [formState, dispatch] = useReducer(
    (state, action) => formReducer(state, action, commentFormRules),
    initialCommentFormState
  );

  const handleSubmit = async () => {
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
      } finally {
        loaderStop();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
