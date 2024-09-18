import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

function CommentsForm() {
  const { postid } = useParams();
  const [token] = useOutletContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const postApi = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/${postid}/comments`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify({
              content: e.target.content.value,
            }),
            method: 'post',
          }
        );
        console.log(res.status);
        // const data = await res.json();

        window.location.reload();
      } catch (err) {
        console.log(err.name);
      }
    };
    postApi();
  };

  return (
    <div className="commentSubmit">
      {token ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="content"></label>
          <textarea name="content" id="content"></textarea>
          <button>Submit</button>
        </form>
      ) : (
        <p>
          <strong>To add comment You must log in first!</strong>
        </p>
      )}
    </div>
  );
}

export default CommentsForm;
