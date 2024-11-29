import requestWithNativeFetch from '../../utils/requestWithNativeFetch';
import styles from './Comment.module.css';
import useAuth from '../../contexts/Auth/useAuth';
import useModal from '../../contexts/Modal/useModal';
import checkPermissions from '../../utils/checkPermissions';
import useNotification from '../../contexts/Notification/useNotification';
import Button from '../form/Button/Button';
import useLoader from '../../contexts/Loader/useLoader';
import { Dispatch, SetStateAction } from 'react';
import { CommentType } from '../../types/SharedInterfaces';

interface CommentProps {
  commentId: number;
  author: string;
  content: string;
  formattedDate: string;
  setComments: Dispatch<SetStateAction<CommentType[]>>;
}

function Comment({
  commentId,
  author,
  content,
  formattedDate,
  setComments,
}: CommentProps) {
  const { user, token } = useAuth();
  const { openModal, closeModal } = useModal();

  const { isAdmin } = checkPermissions(user);
  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();

  const handleDeleteComment = () => {
    openModal('Do you really want to delete this comment?', async () => {
      try {
        loaderStart();
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token || '',
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
        addNotification(
          'Failed to delete the comment. Please try again.',
          'error'
        );
      } finally {
        loaderStop();
        closeModal();
      }
    });
  };

  return (
    <>
      <div className={styles.comment}>
        <p className={styles.commentHeader}>
          <span className={styles.username}>{author}</span> {formattedDate}
        </p>
        <p>{content}</p>
        {isAdmin && <Button onClick={handleDeleteComment}>Delete</Button>}
      </div>
    </>
  );
}

export default Comment;
