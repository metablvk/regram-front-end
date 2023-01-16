import { FC, useState, ChangeEvent, FormEvent } from 'react';
import styles from './create-username-form.module.css';
import { useSelector } from 'react-redux';
import { setCurrentProfile } from 'store/profile/profile.action';
import { selectCurrentUser } from 'store/user/user.selector';
import { selectCurrentProfile } from 'store/profile/profile.selector';
import { useDispatch } from 'react-redux';
import { createUsername } from 'utils/firebase/firebase.utils';

type FormFields = {
  username: string;
};

const defaultFormFields = {
  username: '',
};

const CreateUsernameForm = () => {
  /**
   * Sign Up Form component
   * @param {object} - formFields
   * @param {string} - username
   */
  const dispatch = useDispatch();
  const currentProfile = useSelector(selectCurrentProfile);
  const currentUser = useSelector(selectCurrentUser);
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { username } = formFields;
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
     * @param {string} - username
     * Prevents the default refresh and tries to create a username
     */
    e.preventDefault();
    try {
      await createUsername(currentUser.uid, username);
      dispatch(setCurrentProfile({ ...currentProfile, username: username }));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className={`${styles.create_username_form} container`}>
        <h1>Create Username</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <input
              type='text'
              name='username'
              onChange={handleChange}
              value={username}
              required
            />
            <label htmlFor='username'>username</label>
            <span className={styles.bar}></span>
          </div>
          <button className='btn'>Create</button>
        </form>
      </div>
    </>
  );
};
export default CreateUsernameForm;
