import useAuth from '../../hooks/useAuth';
import PostForm from '../../components/PostForm/PostForm';

function NewPost() {
  const { user } = useAuth();

  return (
    <div className="commentSubmit">
      {user?.is_admin ? (
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
