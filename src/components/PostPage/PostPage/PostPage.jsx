import { useEffect, useState } from 'react';
import fetchRequest from '../../FetchBlogApi/fetchRequest';
import { useParams } from 'react-router-dom';

import Post from '../Post/Post';
import PostComments from '../Comments/PostComments';

function PostPage() {
  const { postid } = useParams();
  const [post, setPost] = useState([]);


  const [comments, setComments] = useState([]);

  

  useEffect(() => {
    const postApi = async () => {
      const data = await fetchRequest(`https://incandescent-creative-gaura.glitch.me/posts/${postid}`);
      setPost(data);
    };
    postApi();
    return () => {
      setPost([]);
    };
  }, [postid]);

  useEffect(() => {
    const postApi = async () => {
      const data = await fetchRequest(
        `https://incandescent-creative-gaura.glitch.me/posts/${postid}/comments`
      );
      console.log(data)
      setComments(data);
    };
    postApi();
    return () => {
      setComments([]);
    };
  }, [postid]);

  return (
    <div>
      <h1>Post:</h1>
      <Post post={post} />
      <hr />
      <h2>Comments</h2>
      <PostComments comments={comments} />
    </div>
  );
}

export default PostPage;
