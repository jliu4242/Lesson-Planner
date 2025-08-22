import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, Auth, EmailAuthProvider} from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

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

export const googleProvider = new GoogleAuthProvider();
