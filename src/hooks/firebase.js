import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import { getFirestore } from "firebase/firestore"
import {
  GoogleAuthProvider,
  getAuth,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { retrieveUserData } from "./utils/userData";

initializeApp(getFirebaseConfig());



export const auth = getAuth();
export const googleOauthProvider = new GoogleAuthProvider();
export const fbOauthProvider = new FacebookAuthProvider();
export const db = getFirestore()
