import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './PostList.module.css'

function PostLists() {
  const [posts,,] = useOutletContext();
  return (
    <div className={styles.postsList}>
      <h1>Titles of posts:</h1>
      <ul>
        {posts.map(post => (
            <li key={post._id}><Link to={`/posts/${post._id}`}>{post.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default PostLists;
