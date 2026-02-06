import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'

export const useAuth = () => {
  const { $auth, $db } = useNuxtApp()

  const auth = $auth as Auth
  const db = $db as Firestore

  const user = useState<FirebaseUser | null>('auth_user', () => null)
  const loading = useState<boolean>('auth_loading', () => true)

  if (process.client && loading.value) {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      loading.value = false
    })
  }

  const registerUser = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        role: 'user',
        createdAt: serverTimestamp()
      })
      return {
        message: 'User registered successfully',
        userId: user.uid
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email is al in gebruik')
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Ongeldig emailadres')
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Wachtwoord moet minstens 6 tekens bevatten')
      }
      throw error
    }
  }

  const loginUser = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password) // zet de authState automatisch
  }

  const logoutUser = async () => {
    await signOut(auth)
  }

  return {
    user,
    loading,
    registerUser,
    loginUser,
    logoutUser
  }
}