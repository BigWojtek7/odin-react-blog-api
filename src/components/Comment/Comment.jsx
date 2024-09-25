import { useState } from 'react';
import requestWithNativeFetch from '../../utils/fetchApi';
import CommentsForm from './CommentForm';
import styles from './Comment.module.css';
import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';
function PostComments({ comments }) {
  const { user, token } = useAuth();
  const { openModal } = useModal();

  const [deleteCommentRes, setDeleteCommentRes] = useState({});
  // console.log(deleteCommentRes)

  const handleDeleteComment = (e) => {
    e.preventDefault();
    const commentId = e.target.value;

    openModal('Do you really want to delete this comment?', () => {
      const fetchDataForDeleteComment = async () => {
        try {
          const options = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            method: 'delete',
          };
          const deleteData = await requestWithNativeFetch(
            `${import.meta.env.VITE_BACKEND_URL}/posts/comments/${commentId}`,
            options
          );
          setDeleteCommentRes(deleteData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForDeleteComment();
      window.location.reload();
    });
  };

  return (
    <>
      <div className={styles.comments}>
        {comments?.map((comment) => (
          <div className={styles.singleComment} key={comment.id}>
            <p>
              <strong>{comment?.username}</strong> {comment?.date_format}
            </p>
            <p>{comment?.content}</p>
            {user.is_admin && (
              <button value={comment?.id} onClick={handleDeleteComment}>
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
