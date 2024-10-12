import useAuth from '../../hooks/useAuth';
import PostForm from '../../components/PostForm/PostForm';
import checkPermissions from '../../utils/checkPermissions';
import styles from './NewPost.module.css'

function NewPost() {
  const { user } = useAuth();
  const { isAdmin } = checkPermissions(user);

  return (
    <div className={styles.newPost}>
      {isAdmin ? (
        <PostForm />
      ) : (
        <p>
          <strong>To add Post You must log in & be an admin!</strong>
        </p>
      )}
    </div>
  );
}

export default NewPost;
