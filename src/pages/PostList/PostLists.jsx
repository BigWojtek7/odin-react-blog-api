import { Link } from 'react-router-dom';
import styles from './PostList.module.css';
import requestWithNativeFetch from '../../utils/fetchApi';

import Icon from '@mdi/react';
import { mdiArrowBottomRightBoldBoxOutline } from '@mdi/js';

import useFetch from '../../hooks/useFetch';
import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';

function PostLists() {
  const { token, user } = useAuth();
  // const [deletePostRes, setDeletePostRes] = useState({});

  const { openModal, closeModal } = useModal();

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
        // setDeletePostRes(deletePostData);
        if (deletePostData.success) {
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== Number(postId))
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        closeModal();
      }
    });
  };

  return (
    <div className={styles.postsList}>
      <h1>Titles of posts:</h1>
      <ul>
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <li key={post.id}>
              <div className={styles.post}>
                <Link to={`/posts/${post.id}`}>
                  <p>{post.title}</p> <p>{post.username}</p>
                  <p>{post.date_format}</p>
                  <Icon path={mdiArrowBottomRightBoldBoxOutline} size={1.8} />
                </Link>
                {user.is_admin && (
                  <button value={post.id} onClick={handleDeletePost}>
                    Delete
                  </button>
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
