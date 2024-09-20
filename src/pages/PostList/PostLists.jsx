import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './PostList.module.css';
import { useState } from 'react';
import requestWithNativeFetch from '../../utils/fetchApiGet';

import Icon from '@mdi/react';
import { mdiArrowBottomRightBoldBoxOutline } from '@mdi/js';
import Loader from '../../components/Loader/Loader';

import useFetch1 from '../../utils/useFetch';

function PostLists() {
  const [token, , user, isLoading, ] = useOutletContext();
  const [deletePostRes, setDeletePostRes] = useState({});
  console.log(deletePostRes)

  const {
    fetchData: posts,
    // error,
    // loading,
  } = useFetch1(`${import.meta.env.VITE_BACKEND_URL}/posts`);

  const handleDelete = (e) => {
    e.preventDefault();
    const postId = e.target.value;

    const fetchDataForDeletePost = async () => {
      try {
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          method: 'delete',
        };
        const deleteData = await requestWithNativeFetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
          options
        );
        setDeletePostRes(deleteData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataForDeletePost();
    window.location.reload();
  };
  return (
    <div className={styles.postsList}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1>Titles of posts:</h1>
          <ul>
            {posts?.map((post) => (
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
