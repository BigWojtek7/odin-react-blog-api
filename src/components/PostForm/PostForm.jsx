import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import requestWithNativeFetch from '../../utils/fetchApi';
import { useState } from 'react';

function PostForm() {
  const navigate = useNavigate();
  const [cretePostRes, setCreatePostRes] = useState({});
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
            title: e.target.title.value,
            content: e.target.content.value,
          }),
          method: 'post',
        };
        const createPostDate = await requestWithNativeFetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/`,
          options
        );
        setCreatePostRes(createPostDate);
        navigate('/');
      } catch (err) {
        console.log(err.name);
      }
    };
    postApi();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input name="title" id="title"></input>
      <label htmlFor="content">Content:</label>
      <textarea name="content" id="content"></textarea>
      <button>Submit</button>
    </form>
  );
}
export default PostForm;
