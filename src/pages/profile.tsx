import Layout from 'components/layout/layout.component';
import styles from './../styles/profile.module.css';
import ProfileHeader from 'components/profile-header/profile-header.component';
import Post from 'components/post/post.component';
const Profile = () => {
  const posts = [
    {
      img: null,
      likes: 124,
      username: 'alicia',
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta veritatis, explicabo mollitia tempore magnam quis.`,
    },
    {
      img: null,
      likes: 124,
      username: 'alicia',
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta veritatis, explicabo mollitia tempore magnam quis.`,
    },
    {
      img: null,
      likes: 524,
      username: 'alicia',
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta veritatis, explicabo mollitia tempore magnam quis.`,
    },
  ];
  return (
    <>
      <Layout>
        <div className={`${styles.profile}`}>
          <ProfileHeader />
          {posts.map((post, id) => (
            <Post key={id} post={post} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Profile;
