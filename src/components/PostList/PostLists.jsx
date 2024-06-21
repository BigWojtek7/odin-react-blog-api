import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './PostList.module.css';
import { useEffect, useState } from 'react';
import fetchRequest from '../FetchBlogApi/fetchRequest';

function PostLists() {
  const [token, , user] = useOutletContext();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postApi = async () => {
      const data = await fetchRequest('http://localhost:3000/posts');
      setPosts(data);
    };
    postApi();
    return () => {
      setPosts([]);
    };
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    const postId = e.target.value;
    console.log(postId)
    const postApi = async () => {
      try {
        const res = await fetch(`http://localhost:3000/posts/${postId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          method: 'delete',
        });
        console.log(res.status);
        // const data = await res.json();
        const data = await res.json();
        console.log(data);
        window.location.reload();
      } catch (err) {
        console.log(err.name);
      }
    };
    postApi();
  };

  return (
    <div className={styles.postsList}>
      <h1>Titles of posts:</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
            {user.is_admin && (
              <button value={post._id} onClick={handleDelete}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostLists;
