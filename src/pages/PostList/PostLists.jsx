import { Link } from 'react-router-dom';
import styles from './PostList.module.css';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';

import Icon from '@mdi/react';
import { mdiArrowBottomRightBoldBoxOutline } from '@mdi/js';

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
      <h1 className={styles.title}>Titles of posts:</h1>
      <ul className={styles.list}>
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <li key={post.id}>
              <div className={styles.postDetails}>
                <Link to={`/posts/${post.id}`}>
                  <p>{post.title}</p> <p>{post.username}</p>
                  <p>{post.date_format}</p>
                  <Icon path={mdiArrowBottomRightBoldBoxOutline} size={1.8} />
                </Link>
                {isAdmin && (
                  <Button value={post.id} onClick={handleDeletePost}>
                    Delete
                  </Button>
                )}
              </div>
              <p>{post.content.slice(0, 200) + '...'}</p>
            </li>
          ))
        ) : (
          <li>No post yet</li>
        )}
      </ul>
    </div>
  );
}

export default PostLists;
