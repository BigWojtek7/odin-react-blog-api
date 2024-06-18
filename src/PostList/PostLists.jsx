import { useOutletContext } from 'react-router-dom';

function PostLists() {
  const posts = useOutletContext();
  console.log(posts)
  return (
    <div className="postLists">
      <ul>
        {posts.map(post => (
            <li key={post._id}>{post.title}</li>
        ))}
        </ul>
      <ul>
        <li>Some</li>
        <li>List</li>
        <li>Example</li>
      </ul>
    </div>
  );
}

export default PostLists;
