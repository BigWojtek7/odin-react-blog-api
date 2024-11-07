import styles from './PostList.module.css';
import containerStyles from '../../layouts/Container.module.css';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch.js';

import useFetch from '../../hooks/useFetch.js';
import useAuth from '../../contexts/Auth/useAuth.js';
import useModal from '../../contexts/Modal/useModal.js';
import useNotification from '../../contexts/Notification/useNotification.js';
import Post from '../../components/Post/Post.jsx';
import useLoader from '../../contexts/Loader/useLoader.js';

function PostLists() {
  const { token } = useAuth();

  const { openModal, closeModal } = useModal();
  const { addNotification } = useNotification();

  const { start: loaderStart, stop: loaderStop } = useLoader();

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
        loaderStart();
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
        loaderStop();
        closeModal();
      }
    });
  };

  return (
    <section className={`${styles.postList} ${containerStyles.container}`}>
      <h2 className={styles.title}>All blog posts:</h2>
      <div className={styles.posts}>
        {posts?.length > 0 ? (
          posts?.map((post) => (
            <Post
              post={post}
              onDelete={handleDeletePost}
              isPreview={true}
              key={post.id}
            />
          ))
        ) : (
          <p>No post yet</p>
        )}
      </div>
    </section>
  );
}

export default PostLists;
