import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./navigation.module.css";

const Navigation = () => {
  // Main navigation
  const [menuState, setMenuState] = useState<boolean>(false);
  const handleClick = () => setMenuState(!menuState);
  return (
    <>
      <nav className={`${styles.navbar} container`}>
        <div className="logo">
          <Link href="/">
            <Image
              src="images/regram-logo.svg"
              height={60}
              width={60}
              alt="regram logo"
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
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/about">
            <li>About</li>
          </Link>
          <Link href="/sign-up" className={styles.sign_up}>
            <li>Sign Up</li>
          </Link>
          <Link href="/login" className={styles.login}>
            <li>Login</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
