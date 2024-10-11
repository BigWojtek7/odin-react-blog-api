import { Link } from 'react-router-dom';
import Button from '../form/Button';
import styles from './Post.module.css';
import useAuth from '../../hooks/useAuth';
import checkPermissions from '../../utils/checkPermissions';

function Post({ post, onDelete = null, isPreview }) {
  const { user } = useAuth();
  const { isAdmin } = checkPermissions(user);
  const previewContent = post?.content.substring(0, 100) + '...';
  const renderButtons = () => (
    <div className={styles.buttons}>
      <Link to={`/posts/${post.id}`} className={styles.postLink}>
        <Button
          style={{
            backgroundColor: `var(--clr-secondary-200)`,
            color: `var(--clr-secondary-400)`,
          }}
        >
          More
        </Button>
      </Link>
      {isAdmin && (
        <Button value={post.id} onClick={onDelete}>
          Delete
        </Button>
      )}
    </div>
  );
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <p className={styles.postDate}>
          <span className={styles.username}>{post?.username}</span>
          {`, ${post?.date_format}`}
        </p>
        <div className={styles.postTitleContainer}>
          <h3 className={styles.postTitle}>{post?.title}</h3>
        </div>
        <p>{isPreview ? previewContent : post?.content}</p>
        {isPreview && renderButtons()}
      </div>
    </div>
  );
}

export default Post;
