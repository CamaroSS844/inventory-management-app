// Import the functions you need from the SDKs you need
import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8ux2aEJY5tDEaz1kXi0IB6hHUZvySeUo",
    authDomain: "inventory-management-e1862.firebaseapp.com",
    projectId: "inventory-management-e1862",
    storageBucket: "inventory-management-e1862.appspot.com",
    messagingSenderId: "147710729481",
    appId: "1:147710729481:web:2f9612c552b88234b187d8",
    measurementId: "G-FWEJJW66W1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const database = getFirestore();