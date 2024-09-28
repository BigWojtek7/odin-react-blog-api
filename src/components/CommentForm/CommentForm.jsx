import { useParams } from 'react-router-dom';

import requestWithNativeFetch from '../../utils/fetchApi';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

import Textarea from '../form/Textarea';
import Button from '../form/Button';

import initialCommentFormState from '../../reducers/initialCommentFormState';
import { useReducer } from 'react';
import formReducer from '../../reducers/formReducer';

function CommentsForm({ setComments }) {
  const [createCommentRes, setCreteCommentRes] = useState({});
  const { postid } = useParams();
  const { token } = useAuth();

  const [formState, dispatch] = useReducer(
    formReducer,
    initialCommentFormState
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          type: 'reset input value',
          payload: initialCommentFormState,
        });
      }
    } catch (err) {
      console.log(err.name);
    }
  };

  const handleInputChange = (e) => {
    dispatch({
      type: 'handle input change',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <div className="commentSubmit">
      {token ? (
        <>
          <form onSubmit={handleSubmit}>
            <Textarea
              name="content"
              label="Content"
              value={formState.content}
              onChange={handleInputChange}
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
