import styles from './Header.module.css';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to="/" className={styles.logo}>
          Daily Blog
        </Link>
      </div>
      <div className={styles.headerRight}>
        <Link to="login">Log-in</Link>
        <Link to="signup">Sign Up</Link>
      </div>
      <hr />
    </div>
  );
}

export default Header;
