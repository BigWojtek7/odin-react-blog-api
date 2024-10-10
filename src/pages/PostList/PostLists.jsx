import { Link } from 'react-router-dom';
import styles from './PostList.module.css';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';

import useFetch from '../../hooks/useFetch';
import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';
import checkPermissions from '../../utils/checkPermissions';
import useNotification from '../../hooks/useNotification';

import Button from '../../components/form/Button';

function PostLists() {
  const { token, user } = useAuth();
  const { isAdmin } = checkPermissions(user);

  const { openModal, closeModal } = useModal();
  const { addNotification } = useNotification();

  const {
    fetchData: posts,
    setFetchData: setPosts,
    // error,
  } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/posts`);

  const handleDeletePost = (e) => {
    e.preventDefault();
    const postId = e.target.value;
    openModal('Do you really want to delete this post?', async () => {
      try {
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          method: 'delete',
        };
        const deletePostData = await requestWithNativeFetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
          options
        );
        if (deletePostData.success) {
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== Number(postId))
          );
          addNotification('The post has been deleted', 'success');
        }
      } catch (err) {
        console.log(err);
      } finally {
        closeModal();
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All blog posts</h2>
      {posts?.length > 0 ? (
        posts?.map((post) => (
          <div className={styles.post} key={post.id}>
            <p className={styles.postDate}>
              <span className={styles.username}>{post.username}</span>
              {`, ${post.date_format}`}
            </p>
            <div className={styles.titleSection}>
              <h3 className={styles.postTitle}>{post.title}</h3>
            </div>
            <div className={styles.buttons}>
              <p>{post.content.slice(0, 200) + '...'}</p>{' '}
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
                <Button value={post.id} onClick={handleDeletePost}>
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No post yet</p>
      )}
    </div>
  );
}

export default PostLists;
