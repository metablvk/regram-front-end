import Image from 'next/image';
import styles from './profile-header.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProfile } from 'utils/firebase/firebase.utils';
import { IProfile } from 'types/Profile';

const ProfileHeader = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<IProfile>({
    email: '',
    username: '',
    img: '',
  });
  useEffect(() => {
    const handleGetProfile = async () => {
      if (router.query && router.query.id) {
        const { id } = router.query;
        const profile = await getProfile(id);
        setProfile(profile);
      }
    };
    handleGetProfile();
    // handleGetProfile();
  }, [router.query]);
  return (
    <header className={styles.profile_header}>
      <div>
        {profile && profile.img ? (
          <Image
            src='/images/stock-image-1.jpg'
            height={115}
            width={115}
            alt='Profile Image'
            className={styles.profile_img}
          />
        ) : (
          <div className={styles.profile_placeholder}>
            {profile && profile.username && profile.username[0]}
          </div>
        )}
      </div>
      <div>
        <div className={styles.profile_stats}>
          <div>
            <strong>Followers</strong>
            <p>123</p>
          </div>
          <div>
            <strong>Following</strong>
            <p>50</p>
          </div>
          <div>
            <strong>Posts</strong>
            <p>10</p>
          </div>
        </div>
        <div className={styles.tag_and_edit}>
          <strong className={styles.profile_tag}>
            @{`${profile.username}`}
          </strong>
          <button className={`${styles.profile_edit_btn}`}>Edit Profile</button>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
