import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

function CommentsForm() {
  const { postid } = useParams();
  const [token] = useOutletContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    // let formData = new FormData();
    // formData.append('username', e.target.username.value);
    // formData.append('password', e.target.password.value);
    const postApi = async () => {
      try {
        const res = await fetch(
          `https://incandescent-creative-gaura.glitch.me/posts/${postid}/comments`,
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
