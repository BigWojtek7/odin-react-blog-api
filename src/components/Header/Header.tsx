import styles from './Header.module.css';
import containerStyles from '../../layouts/Container.module.css';
import { Link } from 'react-router-dom';

import Icon from '@mdi/react';
import { mdiLogin, mdiAccountPlus, mdiLogout } from '@mdi/js';
import useAuth from '../../contexts/Auth/useAuth';
import Button from '../form/Button/Button';
import Logo from './Logo/Logo';

import checkPermissions from '../../utils/checkPermissions';

function Header() {
  const { token, user, logOut } = useAuth();

  const { isAdmin } = checkPermissions(user);

  const handleLogout = () => {
    logOut();
  };

  return (
    <header>
      <div className={`${styles.userBar} ${containerStyles.container}`}>
        {!token ? (
          <div className={styles.accountLinks}>
            <Link to="login">
              Log-in
              <Icon path={mdiLogin} size={1} />
            </Link>
            <Link to="sign-up">
              Sign Up <Icon path={mdiAccountPlus} size={1} />
            </Link>
          </div>
        ) : (
          <div className={styles.usernameContainer}>
            <p>
              Hello <span className={styles.username}>{user?.username}</span> !
            </p>
            <a href="#" onClick={handleLogout} aria-label="Log out">
              <Icon path={mdiLogout} size={1} color={'red'} />
            </a>
          </div>
        )}
        {isAdmin && (
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
