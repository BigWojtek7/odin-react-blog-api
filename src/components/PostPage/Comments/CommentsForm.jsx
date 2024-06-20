import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

function CommentsForm() {
  const { postid } = useParams();
  const [, token,] = useOutletContext();
  console.log(token, 'value3');

  const handleSubmit = (e) => {
    e.preventDefault();
    // let formData = new FormData();
    // formData.append('username', e.target.username.value);
    // formData.append('password', e.target.password.value);
    const postApi = async () => {
      const res = await fetch(
        `http://localhost:3000/posts/${postid}/comments`,
        {
          headers: { 'Content-Type': 'application/json', Authorization: token },
          body: JSON.stringify({
            content: e.target.content.value,
          }),
          method: 'post',
        }
      );
      const data = await res.json();
      console.log(data)
    };
    postApi();
    window.location.reload(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="content"></label>
      <textarea name="content" id="content"></textarea>
      <button>Submit</button>
    </form>
  );
}

export default CommentsForm;
