import styles from "./login-form.module.css";

const LoginForm = () => {
  return (
    <div className={`${styles.login_form} container`}>
      <h1>Login</h1>
      <form>
        <div className={styles.form_group}>
          <input type="text" name="email" required />
          <label htmlFor="">email</label>
          <span className={styles.bar}></span>
        </div>
        <div className={styles.form_group}>
          <input type="password" name="password" required />
          <label htmlFor="">password</label>
          <span className={styles.bar}></span>
        </div>
        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
