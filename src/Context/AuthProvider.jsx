import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ loading, SetLoading ] = useState(true);

    /* Register */
    const registerUser = (email, password) => {
        SetLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    /* Login */
    const signInUser = (email, password) => {
        SetLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    /* Google Login/Register */
    const signInGoogle = () => {
        SetLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    /* Log Out */
    const logOut = () => {
        SetLoading(true);
        return signOut(auth);
    }

    /* Update User Profile */
    const updateUserProfile = () => {
        return updateProfile(auth.currentUser, Profile)
    }

    /* Use Effect */
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
           setUser(currentUser);
           SetLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        registerUser,
        signInUser,
        signInGoogle,
        user,
        loading,
        logOut,
        updateUserProfile
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;