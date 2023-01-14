import styles from "./sign-up-form.module.css";
const SignUpForm = () => {
  return (
    <>
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
            <label htmlFor="">password</label>
            <span className={styles.bar}></span>
          </div>
          <div className={styles.form_group}>
            <input type="password" name="password" required />
            <label htmlFor="">confirm password</label>
            <span className={styles.bar}></span>
          </div>
          <button className="btn">Sign Up</button>
        </form>
      </div>
    </>
  );
};
export default SignUpForm;
