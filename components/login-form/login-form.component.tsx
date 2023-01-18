import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { signInAuthUserWithEmailAndPassword } from 'utils/firebase/firebase.utils';
import { useRouter } from 'next/router';
import styles from './login-form.module.css';

type FormFields = {
  email: string;
  password: string;
  confirmPassword: string;
};

const defaultFormFields = {
  email: '',
  password: '',
  confirmPassword: '',
};

const LoginForm = () => {
  /**
   * Sign Up Form component
   * @param {object} - formFields
   * @param {string} - user email
   * @param {string} - user password
   */
  const router = useRouter();
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { email, password } = formFields;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    /**
     *  Handle Change function
     * @param {object} - e
     *
     * destructures the name and value off the e.target object,
     * and then invokes the setFormFields function passing in
     * previous formFields, and the new updated formField data.
     */
    const { name, value } = e.target as HTMLInputElement;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async (e: FormEvent) => {
    /**
     * Handle Submit functin
     * @param {object} - e
     * @param {string} - email
     * @param {string} - password
     * Prevents the default refresh,
     * and tries to invoke the signInAuthUserWithEmailAndPassword
     * passing in email, and password while catching the error if one
     * is thrown.
     */
    e.preventDefault();
    try {
      const userCred = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (userCred) {
        router.push(`profile/${userCred.user.uid}`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={`${styles.login_form} container`}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <input
            type='text'
            name='email'
            onChange={handleChange}
            value={email}
            required
          />
          <label htmlFor=''>email</label>
          <span className={styles.bar}></span>
        </div>
        <div className={styles.form_group}>
          <input
            type='password'
            name='password'
            onChange={handleChange}
            value={password}
            required
          />
          <label htmlFor=''>password</label>
          <span className={styles.bar}></span>
        </div>
        <button className='btn'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
