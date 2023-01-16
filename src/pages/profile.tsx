import Layout from 'components/layout/layout.component';
import styles from './../styles/profile.module.css';
import ProfileHeader from 'components/profile-header/profile-header.component';
import CreateUsernameForm from './../../components/create-username-form/create-username-form.component';

import { selectCurrentProfile } from 'store/profile/profile.selector';
import { useSelector } from 'react-redux';

const Profile = () => {
  const currentProfile = useSelector(selectCurrentProfile);
  return (
    <>
      <Layout>
        <div className={`${styles.profile}`}>
          {currentProfile && currentProfile.username ? (
            <ProfileHeader />
          ) : (
            <CreateUsernameForm />
          )}
        </div>
      </Layout>
    </>
  );
};

export default Profile;
