import styles from './Header.module.css';
import { Link } from 'react-router-dom';
function Header() {
  const handleLogout = () =>{
    localStorage.removeItem('token')
    alert("You are signed out")
  }

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to="/" className={styles.logo}>
          Daily Blog
        </Link>
      </div>
      <div className={styles.headerRight}>
        <Link to="login">Log-in</Link>
        <Link to="sign-up">Sign Up</Link>
        <a href="#" onClick={handleLogout}>Sign Out</a>
      </div>
      <hr />
    </div>
  );
}

export default Header;
