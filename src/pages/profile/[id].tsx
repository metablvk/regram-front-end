import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// Components
import Layout from 'components/layout/layout.component';
import ProfileHeader from 'components/profile-header/profile-header.component';
import CreateUsernameForm from 'components/create-username-form/create-username-form.component';
import CreatePost from 'components/create-post/create-post.component';
import Post from 'components/post/post.component';
// Redux
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'store/user/user.selector';
import { selectCurrentProfile } from 'store/profile/profile.selector';
import { selectCurrentPost } from 'store/post/post.selector';
// Firebase utilities
import { getAllProfileIds } from 'utils/firebase/firebase.utils';
import { getProfile } from 'utils/firebase/firebase.utils';
// Types
import { IProfile } from 'types/Profile';
import { IPost } from 'types/Post';
// Styles
import styles from './../../styles/profile.module.css';

const Profile = () => {
  /**
   * Profile Component
   * @param {currentUser} - current logged in user
   * @param {currentProfile} - current user profile
   * @param {posts} - current posts
   * @param {id} - profile id for the page
   * @param {object} - profile user object containing email and username
   */
  const currentUser = useSelector(selectCurrentUser);
  const currentProfile = useSelector(selectCurrentProfile);
  const posts = useSelector(selectCurrentPost);
  const router = useRouter();

  const { id } = router.query;
  const [profile, setProfile] = useState<IProfile>({
    email: '',
    username: '',
    img: '',
  });

  useEffect(() => {
    const handleGetProfile = async () => {
      /**
       * Profile Component
       * A function that gets the profile matching the id in the url,
       * and sets the appropriate profile to match with posts inside the component.
       */
      if (router.query && router.query.id) {
        const { id } = router.query;
        const profile = await getProfile(id);
        if (profile) setProfile(profile);
      }
    };
    handleGetProfile();
  }, [router.query, currentProfile]);
  return (
    <>
      <Layout>
        <div className={`${styles.profile}`}>
          <ProfileHeader />
          {/* 
          If currentProfile.username === profile.username add create post component
          else just display posts.
        */}
          {currentProfile &&
          profile &&
          currentProfile.username === profile.username ? (
            /**
             * If currentProfile and profile exist mach the username to see if the user is allowed
             * to create a post.
             */
            <CreatePost />
          ) : currentUser &&
            currentProfile &&
            currentUser.email === currentProfile.email ? (
            <CreateUsernameForm />
          ) : null}
        </div>
        <div className={styles.user_posts}>
          {posts &&
            posts.map((post: IPost, key: number) => {
              if (post.uid === id) {
                return <Post key={key} post={post} />;
              }
            })}
        </div>
      </Layout>
    </>
  );
};

export default Profile;
export async function getStaticProps() {
  return {
    props: {},
  };
}

export async function getStaticPaths() {
  const paths = await getAllProfileIds();
  return {
    paths,
    fallback: false,
  };
}
