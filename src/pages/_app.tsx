import { FC, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { User } from 'firebase/auth';
import { wrapper, store } from '../../store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import '@/styles/globals.css';
import {
  onAuthStateChangedListener,
  getProfile,
  getPosts,
} from '../../utils/firebase/firebase.utils';
import { selectCurrentUser } from 'store/user/user.selector';
import { setCurrentUser } from 'store/user/user.action';
import { setCurrentProfile } from 'store/profile/profile.action';
import { setCurrentPost } from 'store/post/post.action';

function App({ Component, pageProps }: AppProps) {
  /**
   * App Component
   * @param {component} - component
   * @param {pageProps} - Page Props
   * App component utilizing redux store to manage the global state
   * of the application.
   */
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User) => {
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);
  useEffect(() => {
    const handleGetProfile = async () => {
      if (currentUser) {
        const profile = await getProfile(currentUser.uid);
        dispatch(setCurrentProfile(profile));
      }
    };
    handleGetProfile();
  }, [dispatch, currentUser]);
  useEffect(() => {
    const handleGetPosts = async () => {
      const posts = await getPosts();
      dispatch(setCurrentPost([...posts]));
      console.log(posts);
    };
    handleGetPosts();
  }, [dispatch]);
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(App);
