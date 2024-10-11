import { useParams } from 'react-router-dom';

import Post from '../../components/Post/Post';
import useFetch from '../../hooks/useFetch';
import Comments from '../../components/Comments/Comments';
import styles from './PostPage.module.css';

function PostPage() {
  const { postid } = useParams();
  const { fetchData: post } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postid}`
  );

  return (
    <section className={styles.postPage}>
      <div className={styles.container}>
        <Post post={post} isPreview={false} />
        <hr />
        <Comments postid={postid} />
      </div>
    </section>
  );
}

export default PostPage;
