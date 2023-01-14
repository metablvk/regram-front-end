import Layout from "components/layout/layout.component";
import { NextPage } from "next";
import styles from "./../styles/sign-up.module.css";

const SignUp: NextPage = () => {
  return (
    <>
      <Layout>
        <div className={`${styles.sign_up_form} container`}>
          <h1>Sign Up</h1>
          <form>
            <div className={styles.form_group}>
              <input type="text" name="email" required />
              <label htmlFor="">email</label>
              <span className={styles.bar}></span>
            </div>
            <div className={styles.form_group}>
              <input type="password" name="confirm_password" required />
              <label htmlFor="">Password</label>
              <span className={styles.bar}></span>
            </div>
            <div className={styles.form_group}>
              <input type="password" name="password" required />
              <label htmlFor="">Confirm Password</label>
              <span className={styles.bar}></span>
            </div>
            <button className="btn">Sign Up</button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default SignUp;
