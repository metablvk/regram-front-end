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
  // getDocs,
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
  });
};

export const getProfile = async (uid: string) => {
  const docRef = doc(db, 'profile', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const createUsername = async (uid: string, username: string) => {
  const profileRef = doc(db, 'profile', uid);
  return setDoc(profileRef, { username: username }, { merge: true });
};
