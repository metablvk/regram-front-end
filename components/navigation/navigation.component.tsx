import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'store/user/user.selector';
import { signOutUser } from 'utils/firebase/firebase.utils';
import styles from './navigation.module.css';

const Navigation = () => {
  /**
   * Navigation Component
   * @params {user} - returned user object from redux
   */
  const currentUser = useSelector(selectCurrentUser);
  const [menuState, setMenuState] = useState<boolean>(false);
  const handleClick = () => setMenuState(!menuState);
  const handleSignOut = () => {
    signOutUser();
    setMenuState(!menuState);
  };
  return (
    <div className={styles.navigation_container}>
      <nav className={`${styles.navbar} container`}>
        <div className='logo'>
          <Link href='/'>
            <Image
              src='/images/regram-logo.svg'
              height={60}
              width={60}
              alt='regram logo'
            />
          </Link>
        </div>
        <div className={styles.hamburger} onClick={handleClick}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <ul
          className={
            menuState
              ? `${styles.side_nav} ${styles.show_nav}`
              : `${styles.side_nav} `
          }
        >
          <Link href='/' onClick={handleClick}>
            <li>Home</li>
          </Link>
          <Link href='/' onClick={handleClick}>
            <li>About</li>
          </Link>
          {currentUser ? (
            <>
              <Link href={`/profile/${currentUser.uid}`} onClick={handleClick}>
                <li>Profile</li>
              </Link>
              <Link href='/' onClick={handleSignOut}>
                <li>Sign Out</li>
              </Link>
            </>
          ) : (
            <>
              <Link
                href='/sign-up'
                className={styles.sign_up}
                onClick={handleClick}
              >
                <li>Sign Up</li>
              </Link>
              <Link
                href='/login'
                className={styles.login}
                onClick={handleClick}
              >
                <li>Login</li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
