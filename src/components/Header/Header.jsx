import styles from './Header.module.css';
import { Link } from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiLogin, mdiAccountPlus, mdiLogout } from '@mdi/js';
import { useAuth } from '../../context/AuthProvider';

function Header() {
  const { token, user, logOut } = useAuth();

  const handleLogout = () => {
    logOut();
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
          <div className={styles.accountLinks}>
            <Link to="login">
              Log-in
              <Icon path={mdiLogin} size={1.5} />
            </Link>
            <Link to="sign-up">
              Sign Up <Icon path={mdiAccountPlus} size={1.5} />
            </Link>
          </div>
        ) : (
          <div className={styles.accountLinks}>
            <span>
              Hello <strong>{user.username}</strong> !
            </span>
            <a href="#" onClick={handleLogout}>
              <Icon path={mdiLogout} size={1.3} color={'red'} />
            </a>
          </div>
        )}

        {user.is_admin && (
          <Link to="new-post">
            <button>New Post</button>
          </Link>
        )}
      </div>
      <hr />
    </div>
  );
}

export default Header;
