import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PostLists() {
  const posts = useOutletContext();
  console.log(posts)
  return (
    <div className="postLists">
      <ul>
        {posts.map(post => (
            <li key={post._id}><Link to={`/posts/${post._id}`}>{post.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default PostLists;
