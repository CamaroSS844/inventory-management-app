// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrkcdboffBHlCmESlvBtnhCouDK8gcA8U",
  authDomain: "fireapp-32ce8.firebaseapp.com",
  projectId: "fireapp-32ce8",
  storageBucket: "fireapp-32ce8.appspot.com",
  messagingSenderId: "568108679529",
  appId: "1:568108679529:web:8ec1fa9aadb2ff92067df8",
  measurementId: "G-83RRGY051H"
};

// // Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);