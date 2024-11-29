import useFetch from '../../hooks/useFetch';
import styles from './Comments.module.css';
import Comment from '../Comment/Comment';
import CommentsForm from '../CommentForm/CommentForm';

import { CommentType } from '../../types/SharedInterfaces';

interface CommentsProps {
  postid: number;
}

function Comments({ postid }: CommentsProps) {
  const {
    fetchData: comments,
    setFetchData: setComments,
    // error: commentError;
  } = useFetch<CommentType[]>(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postid}/comments`
  );
  console.log(postid);
  return (
    <div className={styles.comments}>
      <h2 className={styles.title}>Comments</h2>
      <CommentsForm setComments={setComments} />
      {comments?.length > 0 ? (
        comments?.map((comment) => (
          <Comment
            key={comment.id}
            commentId={comment.id}
            author={comment.username}
            content={comment.content}
            formattedDate={comment.date_format}
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
