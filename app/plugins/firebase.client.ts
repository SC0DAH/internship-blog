import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyAo-AXFXAgJWoNFlA1U2pxlMgLUSZ1IvLE",
    authDomain: "blogs-internship.firebaseapp.com",
    projectId: "blogs-internship",
    storageBucket: "blogs-internship.firebasestorage.app",
    messagingSenderId: "646944819260",
    appId: "1:646944819260:web:ce7931407369f52e4edb39",
    measurementId: "G-E2NPXWX0T2"
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

  return {
    provide: {
      auth,
      db
    }
  }
})