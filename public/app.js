// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAy-sTGO3159xz__REuakwRkX1n_mwh3jY",
  authDomain: "otakuwproj.firebaseapp.com",
  projectId: "otakuwproj",
  storageBucket: "otakuwproj.firebasestorage.app",
  messagingSenderId: "1035259366870",
  appId: "1:1035259366870:web:73eb3a7b1befa20b862877",
  measurementId: "G-N2B8BRM6L1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
