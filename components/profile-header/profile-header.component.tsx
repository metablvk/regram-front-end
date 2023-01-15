import Image from 'next/image';
import styles from './profile-header.module.css';

const ProfileHeader = () => {
  return (
    <header className={styles.profile_header}>
      <div>
        <Image
          src='/images/stock-image-1.jpg'
          height={115}
          width={115}
          alt='Profile Image'
          className={styles.profile_img}
        />
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
          <strong className={styles.profile_tag}>@Ashley</strong>
          <button className={`${styles.profile_edit_btn}`}>Edit Profile</button>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
