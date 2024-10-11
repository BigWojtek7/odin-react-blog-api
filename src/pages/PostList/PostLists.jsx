import styles from './PostList.module.css';
import requestWithNativeFetch from '../../utils/requestWithNativeFetch';

import useFetch from '../../hooks/useFetch';
import useAuth from '../../hooks/useAuth';
import useModal from '../../hooks/useModal';
import useNotification from '../../hooks/useNotification';
import Post from '../../components/Post/Post';

function PostLists() {
  const { token } = useAuth();

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
      <h2 className={styles.title}>All blog posts:</h2>
      {posts?.length > 0 ? (
        posts?.map((post) => (
          <Post
            post={post}
            onDelete={handleDeletePost}
            key={post.id}
            isPreview={true}
          />
        ))
      ) : (
        <p>No post yet</p>
      )}
    </div>
  );
}

export default PostLists;
