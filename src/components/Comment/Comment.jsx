import requestWithNativeFetch from '../../utils/requestWithNativeFetch';
import styles from './Comment.module.css';
import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';
import checkPermissions from '../../utils/checkPermissions';
import useNotification from '../../hooks/useNotification';
import Button from '../form/Button/Button';

function Comment({ commentId, author, content, date, setComments }) {
  const { user, token } = useAuth();
  const { openModal, closeModal } = useModal();

  const { isAdmin } = checkPermissions(user);
  const { addNotification } = useNotification();

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
        if (deleteCommentData.success) {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
          );
          addNotification('The comment has been deleted', 'success');
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
        <p className={styles.commentHeader}>
          <span className={styles.username}>{author}</span> {date}
        </p>
        <p>{content}</p>
        {isAdmin && <Button onClick={handleDeleteComment}>Delete</Button>}
      </div>
    </>
  );
}

export default Comment;
