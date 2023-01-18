import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './create-post.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from 'store/user/user.selector';
import { selectCurrentProfile } from 'store/profile/profile.selector';
import { selectCurrentPost } from 'store/post/post.selector';
import { setCurrentPost } from 'store/post/post.action';
import { createPost } from 'utils/firebase/firebase.utils';

type FormFields = {
  content: string;
};

const defaultFormFields = {
  content: '',
};

const CreatePost = () => {
  const currentUser = useSelector(selectCurrentUser);
  const profile = useSelector(selectCurrentProfile);
  const posts = useSelector(selectCurrentPost);
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const { content } = formFields;
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    /**
     *  Handle Change function
     * @param {object} - e
     *
     * destructures the name and value off the e.target object,
     * and then invokes the setFormFields function passing in
     * previous formFields, and the new updated formField data.
     */
    const { name, value } = e.target as HTMLTextAreaElement;
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
      const post = await createPost(
        currentUser.uid,
        profile.username,
        formFields
      );
      dispatch(setCurrentPost([post, ...posts]));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form className={styles.create_post} onSubmit={handleSubmit}>
      <textarea
        onChange={handleChange}
        value={content}
        name='content'
      ></textarea>
      <button>Create</button>
    </form>
  );
};

export default CreatePost;
