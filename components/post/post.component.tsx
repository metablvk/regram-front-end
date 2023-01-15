import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './post.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

type Post = {
  img: string | null;
  likes: number;
  username: string;
  description: string;
};

type Props = {
  post: Post;
};
const Post: FC<Props> = ({ post }) => {
  return (
    <div className={styles.post}>
      {post.img && (
        <Image
          src={post.img}
          height={200}
          width={200}
          alt='Stock image'
          className={styles.post_img}
        />
      )}
      <section className={styles.card}>
        <div className={styles.card_header}>
          <div>
            <p>{post.likes} likes</p>
          </div>
          <div className={styles.controls}>
            <FontAwesomeIcon icon={faComment} />
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div>
            <p className={styles.card_tag}>{post.username}</p>
          </div>
        </div>
        <div className={styles.card_body}>
          <p>{post.description}</p>
        </div>
        <div className={styles.card_footer}>
          <Link href='/'>View All Comments</Link>
        </div>
      </section>
    </div>
  );
};

export default Post;
