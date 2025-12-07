import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, } from 'firebase/auth'
import {app} from '../firebase/firebase.config'

import { AuthContext } from './AuthContext'
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)


    const creatUserWithEamil = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const logout = async () => {
        return signOut(auth)
    }

    const updateProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            setUser(currentUser)
        })
        return () => {
            return unsubscribe()
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        updateProfile,
        logout,
        signInWithGoogle,
        signIn,
        creatUserWithEamil

    }
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider