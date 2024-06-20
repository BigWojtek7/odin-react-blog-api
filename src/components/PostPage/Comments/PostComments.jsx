import CommentsForm from './CommentsForm';
function PostComments({ comments }) {

  return (
    <>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p><strong>{comment.user.username}</strong> {comment.date_format}</p>
          <p>{comment.content}</p>
        </div>
      ))}
      <CommentsForm />
    </>
  );
}

export default PostComments;
