import styles from './Header.module.css';
import { Link } from 'react-router-dom';
function Header({ token, setToken, user }) {
  // const [, token, setToken] = useOutletContext();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    alert('You are signed out');
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to="/" className={styles.logo}>
          Daily Blog
        </Link>
      </div>
      <div className={styles.headerRight}>
        {!token ? (
          <div>
            <Link to="login">Log-in</Link>
            <Link to="sign-up">Sign Up</Link>
          </div>
        ) : (
          <div className="loggedIn">
            <span>Hello <strong>{user.username}</strong> !</span>
            <a href="#" onClick={handleLogout}>
              Sign Out
            </a>
          </div>
        )}

        {user.is_admin && <Link to="new-post"><button>New Post</button></Link>}
      </div>
      <hr />
    </div>
  );
}

export default Header;
