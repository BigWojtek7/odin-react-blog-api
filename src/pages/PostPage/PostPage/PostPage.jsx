import { useEffect, useState } from 'react';
import fetchRequest from '../../../components/FetchBlogApi/fetchRequest';
import { useParams } from 'react-router-dom';

import Post from '../Post/Post';
import PostComments from '../Comments/PostComments';
import useFetch1 from '../../../utils/useFetch';

import styles from './PostPage.module.css';

function PostPage() {
  const { postid } = useParams();
  const {
    fetchData: post,
    error:postError,
    loading:postLoading,
  } = useFetch1(`${import.meta.env.VITE_BACKEND_URL}/posts/${postid}`);

  console.log(post, postError, postLoading);

  const {
    fetchData: comments,
    error:commentError,
    loading: commentLoading,
  } = useFetch1(`${import.meta.env.VITE_BACKEND_URL}/posts/${postid}/comments`);

  return (
    <div>
      <h1 className={styles.headerPost}>Post:</h1>
      <Post post={post} />
      <hr />
      <h2 className={styles.headerComment}>Comments</h2>
      <PostComments comments={comments} />
    </div>
  );
}

export default PostPage;
