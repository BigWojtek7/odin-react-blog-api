import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function NewPost() {
  const [token, , user] = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const postApi = async () => {
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            title: e.target.title.value,
            content: e.target.content.value,
          }),
          method: 'post',
        });
        navigate('/');
      } catch (err) {
        console.log(err.name);
      }
    };
    postApi();
  };
  return (
    <div className="commentSubmit">
      {user.is_admin ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input name="title" id="title"></input>
          <label htmlFor="content">Content:</label>
          <textarea name="content" id="content"></textarea>
          <button>Submit</button>
        </form>
      ) : (
        <p>
          <strong>To add Post You must log in & be an admin!</strong>
        </p>
      )}
    </div>
  );
}

export default NewPost;
