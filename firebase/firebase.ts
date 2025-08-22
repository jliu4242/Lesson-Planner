import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, Auth, EmailAuthProvider} from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import firebase from "firebase/compat/app";

const firebaseConfig = {
    apiKey: "AIzaSyAK4cD639TmAWOKlMXtdNdE5mRxN9-5Gq8",
    authDomain: "test-1ec55.firebaseapp.com",
    projectId: "test-1ec55",
    storageBucket: "test-1ec55.firebasestorage.app",
    messagingSenderId: "710680506961",
    appId: "1:710680506961:web:1d66facba9ccd21484be70",
    measurementId: "G-PCNGHSCGJT"
  };


const app = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export class Firebase {
    auth: Auth;
    db: Firestore;
    static auth: any;

    constructor() {
        this.auth = auth;
        this.db = db;
    }

    doCreateUserWithEmailAndPassword = (email: string, password: string) =>
        createUserWithEmailAndPassword(this.auth, email, password);

    doSignInWithEmailAndPassword = (email: string, password: string) =>
        signInWithEmailAndPassword(this.auth, email, password);

    doSignOut = () => signOut(this.auth);
}

export default Firebase;

export { auth, EmailAuthProvider };

export const ui = new firebaseui.auth.AuthUI(auth);

export const uiConfig: firebaseui.auth.Config = {
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: () => true,
      uiShown: () => {
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
      },
    },
  };
