import styles from './Header.module.css';
import { Link } from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiLogin, mdiAccountPlus, mdiLogout } from '@mdi/js';
import useAuth from '../../hooks/useAuth';
import Button from '../form/Button';
import Logo from './Logo/Logo';

function Header() {
  const { token, user, logOut } = useAuth();

  const handleLogout = () => {
    logOut();
  };

  return (
    <header>
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
              Hello <strong>{user?.username}</strong> !
            </span>
            <a href="#" onClick={handleLogout} aria-label="Log out">
              <Icon path={mdiLogout} size={1.3} color={'red'} />
            </a>
          </div>
        )}
        {user?.is_admin && (
          <Link to="new-post">
            <Button>New Post</Button>
          </Link>
        )}
      </div>
      <Logo />
    </header>
  );
}

export default Header;
