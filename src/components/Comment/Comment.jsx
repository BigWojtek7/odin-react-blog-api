import requestWithNativeFetch from '../../utils/fetchApi';
import styles from './Comment.module.css';
import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';
function Comment({ commentId, author, content, date, setComments }) {
  const { user, token } = useAuth();
  const { openModal, closeModal } = useModal();

  // const [deleteCommentRes, setDeleteCommentRes] = useState({});

  const handleDeleteComment = (e) => {
    e.preventDefault();

    openModal('Do you really want to delete this comment?', async () => {
      try {
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          method: 'delete',
        };
        const deleteCommentData = await requestWithNativeFetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/comments/${commentId}`,
          options
        );
        // setDeleteCommentRes(deleteCommentData);
        if (deleteCommentData.success) {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        closeModal();
      }
    });
  };

  return (
    <>
      <div className={styles.comment}>
        <p>
          <strong>{author}</strong> {date}
        </p>
        <p>{content}</p>
        {user.is_admin && <button onClick={handleDeleteComment}>Delete</button>}
      </div>
    </>
  );
}

export default Comment;
