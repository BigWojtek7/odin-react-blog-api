import useFetch from '../../hooks/useFetch';
import styles from './Comments.module.css';
import Comment from '../Comment/Comment';
import CommentsForm from '../CommentForm/CommentForm';

function Comments({ postid }) {
  const {
    fetchData: comments,
    setFetchData: setComments,
    // error: commentError;
  } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postid}/comments`);

  return (
    <div className={styles.comments}>
      <h2 className={styles.title}>Comments:</h2>
      <CommentsForm setComments={setComments} />
      {comments?.length > 0 ? (
        comments?.map((comment) => (
          <Comment
            key={comment.id}
            commentId={comment.id}
            author={comment.username}
            content={comment.content}
            date={comment.date_format}
            setComments={setComments}
          />
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
}
export default Comments;
