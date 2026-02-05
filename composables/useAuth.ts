import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'

export const useAuth = () => {
  const { $auth, $db } = useNuxtApp()

  // Type assertions
  const auth = $auth as Auth
  const db = $db as Firestore

  const registerUser = async (name: string, email: string, password: string) => {
    try {
      console.log("Registering user in Firebase", email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log("Firebase auth returned", userCredential.user.uid);
      const user = userCredential.user
      console.log("Stroing user in firestore");
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        role: 'user',
        createdAt: serverTimestamp()
      })
      console.log("User stored in Firestore");
      return {
        message: 'User registered successfully',
        userId: user.uid
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email already registered')
      }
      throw error
    }
  }

  const loginUser = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  }

  const logoutUser = async () => {
    await signOut(auth)
  }

  return {
    registerUser,
    loginUser,
    logoutUser
  }
}