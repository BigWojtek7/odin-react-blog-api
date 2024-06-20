import CommentsForm from './CommentsForm';
import styles from './PostComments.module.css'
function PostComments({ comments }) {

  return (
    <>
    <div className={styles.comments}>
      {comments.map((comment) => (
        <div className={styles.singleComment} key={comment._id}>
          <p><strong>{comment.user.username}</strong> {comment.date_format}</p>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
      <CommentsForm />
    </>
  );
}

export default PostComments;
