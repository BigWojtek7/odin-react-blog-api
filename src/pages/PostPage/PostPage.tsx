import { useParams } from 'react-router-dom';

import Post from '../../components/Post/Post';
import useFetch from '../../hooks/useFetch';
import Comments from '../../components/Comments/Comments';
import containerStyles from '../../layouts/Container.module.css';

import { PostType } from '../../types/SharedInterfaces';

function PostPage() {
  const { postid } = useParams();
  const { fetchData: post } = useFetch<PostType>(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postid}`
  );

  return (
    <section className={containerStyles.container}>
      {!Array.isArray(post) ? (
        <Post post={post} isPreview={false} />
      ) : (
        <p>Loading post...</p>
      )}
      <hr />
      <Comments postid={Number(postid)} />
    </section>
  );
}

export default PostPage;
