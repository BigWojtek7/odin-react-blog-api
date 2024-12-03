import { useParams } from 'react-router-dom';

import requestWithNativeFetch from '../../utils/requestWithNativeFetch';
import { useState } from 'react';
import useAuth from '../../contexts/Auth/useAuth';

import Textarea from '../form/Textarea/Textarea';
import Button from '../form/Button/Button';

import {
  initialCommentFormState,
  commentFormRules,
  InitialCommentFormType,
} from '../../reducers/initialCommentFormState';
import { useReducer } from 'react';
import useNotification from '../../contexts/Notification/useNotification';
import useLoader from '../../contexts/Loader/useLoader';
import { CreateResType } from '../../types/SharedInterfaces';

import { CommentType } from '../../types/SharedInterfaces';
import createFormReducer from '../../utils/createFormReducer';
import handleInputChange from '../../utils/handleInputChange';

interface CommentFormProps {
  setComments: React.Dispatch<React.SetStateAction<CommentType[] | []>>;
}

function CommentsForm({ setComments }: CommentFormProps): JSX.Element {
  const [createCommentRes, setCreteCommentRes] = useState<CreateResType | null>(
    null
  );
  const { postid } = useParams();
  const { token } = useAuth();
  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();

  const commentFormReducer =
    createFormReducer<InitialCommentFormType>(commentFormRules);
  const [formState, dispatch] = useReducer(
    commentFormReducer,
    initialCommentFormState
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
              date: createCommentData.data.date,
              date_format: createCommentData.data.date_format,
              username: createCommentData.data.username,
            },
            ...(prevComments ?? []),
          ]);
          dispatch({
            type: 'reset_input_value',
            initialState: initialCommentFormState,
          });
          addNotification('the comment has been created', 'success');
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.name);
          console.log(err.message);
        } else {
          console.log('Unknown error', err);
        }
      } finally {
        loaderStop();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange<InitialCommentFormType>(e, dispatch);
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
              onChange={handleChange}
              error={formState.errors.content}
            />
            <Button type="submit">Submit</Button>
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
