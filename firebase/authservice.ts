import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

// Sign up a new user
export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Log in an existing user
export const logIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Log out
export const logOut = async () => {
  return await signOut(auth);
};

export const observeAuthState = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
}