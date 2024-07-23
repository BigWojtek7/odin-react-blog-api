import CommentsForm from './CommentsForm';
import styles from './PostComments.module.css';
import { useOutletContext } from 'react-router-dom';
function PostComments({ comments }) {
  const [token, , user] = useOutletContext();
  
  const handleDelete = (e) => {
    e.preventDefault();
    const commentId = e.target.value;
    console.log(commentId);
    const postApi = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/comments/${commentId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          method: 'delete',
        });
        const data = await res.json();
        console.log(data)
        window.location.reload();

        
      } catch (err) {
        console.log(err);
      }
    };
    postApi();
  };

  return (
    <>
      <div className={styles.comments}>
        {comments.map((comment) => (
          <div className={styles.singleComment} key={comment._id}>
            <p>
              <strong>{comment.user.username}</strong> {comment.date_format}
            </p>
            <p>{comment.content}</p>
            {user.is_admin && (
              <button value={comment._id} onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      <CommentsForm />
    </>
  );
}

export default PostComments;
