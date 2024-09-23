import { useState } from 'react';
import requestWithNativeFetch from '../../../utils/fetchApi';
import CommentsForm from './CommentsForm';
import styles from './PostComments.module.css';
import { useOutletContext } from 'react-router-dom';
function PostComments({ comments }) {
  const [token, , user] = useOutletContext();

  const [deleteCommentRes, setDeleteCommentRes] = useState({});

  console.log(deleteCommentRes);
  const handleDelete = (e) => {
    e.preventDefault();
    const commentId = e.target.value;

    const fetchDataForDeletePost = async () => {
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
    fetchDataForDeletePost();
    window.location.reload();
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
              <button value={comment?.id} onClick={handleDelete}>
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
