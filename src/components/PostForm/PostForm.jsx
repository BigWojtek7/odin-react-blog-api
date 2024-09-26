import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import requestWithNativeFetch from '../../utils/fetchApi';
import { useState } from 'react';

function PostForm() {
  const navigate = useNavigate();
  const [createPostRes, setCreatePostRes] = useState({});
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          title: e.target.title.value,
          content: e.target.content.value,
        }),
        method: 'post',
      };
      const createPostDate = await requestWithNativeFetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/`,
        options
      );
      console.log(createPostDate);
      setCreatePostRes(createPostDate);
      if (createPostDate.success) {
        navigate('/');
      }
    } catch (err) {
      console.log(err.name);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input name="title" id="title"></input>
        <label htmlFor="content">Content:</label>
        <textarea name="content" id="content"></textarea>
        <button>Submit</button>
      </form>
      {!createPostRes?.success &&
        createPostRes?.msg?.map((err, index) => <p key={index}>{err.msg}</p>)}
    </>
  );
}
export default PostForm;
