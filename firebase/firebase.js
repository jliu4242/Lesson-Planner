import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

var firebaseui = require('firebaseui');

const firebaseConfig = {
    apiKey: "AIzaSyAK4cD639TmAWOKlMXtdNdE5mRxN9-5Gq8",
    authDomain: "test-1ec55.firebaseapp.com",
    projectId: "test-1ec55",
    storageBucket: "test-1ec55.firebasestorage.app",
    messagingSenderId: "710680506961",
    appId: "1:710680506961:web:1d66facba9ccd21484be70",
    measurementId: "G-PCNGHSCGJT"
  };

export const app = initalizeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);