import CommentsForm from './CommentsForm';
function PostComments({ comments }) {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.title}</p>
          <p>{comment.content}</p>
        </div>
      ))}
      <CommentsForm />
    </>
  );
}

export default PostComments;
