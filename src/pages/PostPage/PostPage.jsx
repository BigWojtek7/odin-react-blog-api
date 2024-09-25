import { useParams } from 'react-router-dom';

import Post from '../../components/Post/Post';
import Comment from '../../components/Comment/Comment';
import useFetch from '../../hooks/useFetch';
import Comments from '../../components/Comments/Comments';
import styles from './PostPage.module.css';

function PostPage() {
  const { postid } = useParams();
  const { fetchData: post, error: postError } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postid}`
  );

  // const {
  //   fetchData: comments,
  //   // error: commentError;
  // } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postid}/comments`);

  return (
    <div>
      <h1 className={styles.headerPost}>Post:</h1>
      <Post post={post} />
      <hr />
      <h2 className={styles.headerComment}>Comments</h2>
      <Comments postid={postid}/>
    </div>
  );
}

export default PostPage;
