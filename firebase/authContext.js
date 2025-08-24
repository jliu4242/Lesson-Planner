import React, { createContext, useEffect, useState, useContext } from 'react';
import { auth } from './firebase.ts';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentuser] = useState(null);
    const [userloggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect = (() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe
    }, [])

    async function initializeUser(user) {
        if (user) {
            setCurrentuser({ ...user});
            setUserLoggedIn(true);
        } else {
            setCurrentuser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userloggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
             {!loading && children}
        </AuthContext.Provider>
    )
}