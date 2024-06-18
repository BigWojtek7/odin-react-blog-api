import { useEffect, useState } from 'react';
import fetchRequest from '../../FetchBlogApi/fetchRequest';

import { useParams } from 'react-router-dom';

function PostPage() {
  const { postid } = useParams();
  const [post, setPost] = useState([]);
  useEffect(() => {
    const postApi = async () => {
      const data = await fetchRequest(`http://localhost:3000/posts/${postid}`);
      setPost(data);
    };
    postApi();
    return () => {
      setPost([]);
    };
  }, [postid]);
  return (
    <div>
      <Post post={post} />
    </div>
  );
}

export default PostPage;
