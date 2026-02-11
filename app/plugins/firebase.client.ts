import { initializeApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'

export default defineNuxtPlugin(() => {  // 👈 no longer async
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey as string,
    authDomain: config.public.firebaseAuthDomain as string,
    projectId: config.public.firebaseProjectId as string,
    storageBucket: config.public.firebaseStorageBucket as string,
    messagingSenderId: config.public.firebaseMessagingSenderId as string,
    appId: config.public.firebaseAppId as string,
    measurementId: config.public.firebaseMeasurementId as string,
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

  // Initialize analytics in the background, non-blocking
  let analytics: Analytics | null = null
  isSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app)
  })

  // Wrap in a getter so composables always get the current value
  // even if analytics initialized after the plugin provided it
  const getAnalyticsInstance = () => analytics

  return {
    provide: {
      auth,
      db,
      getAnalyticsInstance,
    }
  }
})

declare module '#app' {
  interface NuxtApp {
    $auth: Auth
    $db: Firestore
    $getAnalyticsInstance: () => Analytics | null
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $auth: Auth
    $db: Firestore
    $getAnalyticsInstance: () => Analytics | null
  }
}

export {}