// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  onSnapshot,
  doc,
  setDoc,
  collection,
  query,
  where,
  addDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTcBOsbzftm0geW5HW6X5XtDqG2COaa1o",
  authDomain: "crypto-watchlist-cfce1.firebaseapp.com",
  projectId: "crypto-watchlist-cfce1",
  storageBucket: "crypto-watchlist-cfce1.appspot.com",
  messagingSenderId: "159122072398",
  appId: "1:159122072398:web:07e8b1b1b2404c66e4f41f",
  measurementId: "G-JW4RCC7JX8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

export {
  auth,
  provider,
  app,
  setDoc,
  collection,
  addDoc,
  query,
  signInWithPopup,
  db,
  doc,
  where,
  onSnapshot,
};
