import { useParams } from 'react-router-dom';

import requestWithNativeFetch from '../../utils/fetchApi';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

function CommentsForm({ setComments }) {
  const [createCommentRes, setCreteCommentRes] = useState({});
  const { postid } = useParams();
  const { token } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const postApi = async () => {
      try {
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            content: e.target.content.value,
          }),
          method: 'post',
        };

        const createCommentData = await requestWithNativeFetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/${postid}/comments`,
          options
        );
        setCreteCommentRes(createCommentData);
        console.log(createCommentData);
        setComments((prevComments) => [
          {
            id: createCommentData.id,
            user_id: createCommentData.user_id,
            post_id: createCommentData.post_id,
            content: createCommentData.content,
            date_format: createCommentData.date_format,
            username: createCommentData.username,
          },
          ...prevComments,
        ]);
        e.target.reset();
      } catch (err) {
        console.log(err.name);
      }
    };
    postApi();
  };

  return (
    <div className="commentSubmit">
      {token ? (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="content"></label>
            <textarea name="content" id="content"></textarea>
            <button>Submit</button>
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
