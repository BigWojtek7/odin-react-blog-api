import useAuth from '../../hooks/useAuth';
import PostForm from '../../components/PostForm/PostForm';
import checkPermissions from '../../utils/checkPermissions';

function NewPost() {
  const { user } = useAuth();
  const { isAdmin } = checkPermissions(user);

  return (
    <div>
      {isAdmin ? (
        <PostForm />
      ) : (
        <p>
          <strong>To add Post You must log in & be an admin!</strong>
        </p>
      )}
    </div>
  );
}

export default NewPost;
