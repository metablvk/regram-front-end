import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
  doc,
} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyAmGDgW2aLjf4fgYZ1xqRZn_1Jxr6oxvEo',
  authDomain: 'regram-af1c6.firebaseapp.com',
  projectId: 'regram-af1c6',
  storageBucket: 'regram-af1c6.appspot.com',
  messagingSenderId: '766330943935',
  appId: '1:766330943935:web:8f80167c244ca1494f090a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const auth = getAuth();

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  /**
   * Firebase function to create a user.
    @typedef {UserCredential}
    @param {string} email - Email to create in firebase auth
    @param {string} password - Password create in firebase auth 

    @example
    if email or password empty
    return 

    @example
    if email or password not empty 
    return createUserWithEmailAndPassword
   */

  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  /**
   * Firebase function to login a user.
    @typedef {UserCredential}
    @param {string} email - Email to create in firebase auth
    @param {string} password - Password create in firebase auth 

    @example
    if email or password empty return 

    @example
    if email or password not empty 
    return signInWithEmailAndPassword 
   */
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback: any) =>
  onAuthStateChanged(auth, callback);

export const signOutUser = async (): Promise<void> => await signOut(auth);

export const createProfile = async (uid: string, email: string) => {
  await setDoc(doc(db, 'profile', uid), {
    email: email,
    img: '',
  });
};

type Profile = {
  email: string;
  username: string | undefined;
  img: string;
};

export const getProfile = async (uid: any) => {
  const docRef = doc(db, 'profile', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as Profile;
};

export const createUsername = async (uid: string, username: string) => {
  const docRef = doc(db, 'profile', username.toLowerCase());
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const profileRef = doc(db, 'profile', uid);
    return setDoc(
      profileRef,
      { username: username.toLowerCase() },
      { merge: true }
    );
  }
};

export const getAllProfileIds = async () => {
  /*
    A function that gets all book titles, and uses them as ids.
  */
  const collectionRef = collection(db, 'profile');
  const q = query(collectionRef);
  try {
    const querySnapshot = await getDocs(q);
    const ids = querySnapshot.docs.map((docSnapshot) => {
      return {
        params: {
          id: docSnapshot.id,
        },
      };
    });
    return ids;
  } catch (e) {
    console.error('Error getting books: ', e);
  }
};

type Post = {
  content: string;
};

export const createPost = async (uid: string, username: string, post: Post) => {
  /**
   * A function that creates a post in the database.
   */
  const { content } = post;
  const postRef = await addDoc(collection(db, 'posts'), {
    content,
    img: '',
    likes: 0,
    comments: 0,
    username,
    uid,
  });
  const docSnap = await getDoc(postRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
};

// export const getPosts = async (uid: string) => {
//   const q = query(collection(db, 'posts'), where('uid', '==', uid));
//   const querySnapshot = await getDocs(q);
//   const posts = querySnapshot.docs.map((docSnapshot) => {
//     return docSnapshot.data();
//   });
//   return posts;
// };

export const getPosts = async () => {
  const querySnapshot = getDocs(collection(db, 'posts'));
  const posts = (await querySnapshot).docs.map((docSnapshot) => {
    return docSnapshot.data();
  });
  return posts;
};
