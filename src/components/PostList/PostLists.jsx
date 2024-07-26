import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './PostList.module.css';

import { useFetch } from '../../utils/useFetch';
import Icon from '@mdi/react';
import { mdiArrowBottomRightBoldBoxOutline } from '@mdi/js';
import Loader from '../Loader/Loader';

function PostLists() {
  const [token, , user] = useOutletContext();

  
  const {fetchData , error , loading } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/posts`)
  console.log(fetchData, error,loading)
  const handleDelete = (e) => {
    e.preventDefault();
    const postId = e.target.value;
    console.log(postId);
    const postApi = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            method: 'delete',
          }
        );
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
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Titles of posts:</h1>
          <ul>
            {fetchData?.map((post) => (
              <li key={post.id}>
                <div className={styles.post}>
                  <Link to={`/posts/${post.id}`}>
                    <p>{post.title}</p> <p>{post.username}</p>
                    <p>{post.date_format}</p>
                    <Icon path={mdiArrowBottomRightBoldBoxOutline} size={1.8} />
                  </Link>
                  {user.is_admin && (
                    <button value={post.id} onClick={handleDelete}>
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PostLists;
