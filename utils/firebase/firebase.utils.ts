import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmGDgW2aLjf4fgYZ1xqRZn_1Jxr6oxvEo",
  authDomain: "regram-af1c6.firebaseapp.com",
  projectId: "regram-af1c6",
  storageBucket: "regram-af1c6.appspot.com",
  messagingSenderId: "766330943935",
  appId: "1:766330943935:web:8f80167c244ca1494f090a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
