import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './post.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { IPost } from 'types/Post';
import { addLike, removeLike } from 'utils/firebase/firebase.utils';
import { selectCurrentUser } from 'store/user/user.selector';
import { useSelector } from 'react-redux';
import { selectCurrentPost } from 'store/post/post.selector';
import { setCurrentPost } from 'store/post/post.action';

type Props = {
  post: IPost;
};

const Post: FC<Props> = ({ post }) => {
  const currentUser = useSelector(selectCurrentUser);
  const currentPost = useSelector(selectCurrentPost);

  // WIP: Fix type error to use IPOST
  const [postState, setPostState] = useState<any>(post);
  const [likes, setLikes] = useState(post.likes.length);
  const handleLike = async () => {
    if (currentUser) {
      try {
        // Likes a post by passing in the id, and user id
        if (post.id) {
          if (!postState.likes.includes(currentUser.uid)) {
            const likedPost = await addLike(post.id, currentUser.uid);
            // Get's the liked posts location

            const likedPostLocation = currentPost.findIndex(
              (obj: IPost) => obj.id === post.id
            );
            if (likedPost) {
              const updatedPosts = currentPost;
              updatedPosts[likedPostLocation] = likedPost;
              setCurrentPost(updatedPosts);
              setPostState(likedPost);
              console.log(likedPost);
            }
          } else {
            const removedLikePost = await removeLike(post.id, currentUser.uid);
            const removedLikePostLocation = currentPost.findIndex(
              (obj: IPost) => obj.id === post.id
            );
            if (removedLikePost) {
              const updatedPosts = currentPost;
              updatedPosts[removedLikePostLocation] = removedLikePost;
              setCurrentPost(updatedPosts);
              setPostState(removedLikePost);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className={styles.post}>
      {postState && (
        <>
          {postState.img && (
            <Image
              src={postState.img}
              height={200}
              width={200}
              alt='Stock image'
              className={styles.postState_img}
            />
          )}
          <section className={styles.card}>
            <div className={styles.card_header}>
              <div>
                <p>{postState.likes.length} likes</p>
              </div>
              <div className={styles.controls}>
                <FontAwesomeIcon icon={faComment} />
                <FontAwesomeIcon
                  className={`${
                    currentUser &&
                    postState.likes.includes(currentUser.uid) &&
                    styles.liked
                  }`}
                  icon={faHeart}
                  onClick={handleLike}
                />
              </div>
              <div>
                <p className={styles.card_tag}>{postState.username}</p>
              </div>
            </div>
            <div className={styles.card_body}>
              <p>{postState.content}</p>
            </div>
            <div className={styles.card_footer}>
              <Link href='/'>View All Comments</Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Post;
