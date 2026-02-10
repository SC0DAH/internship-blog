import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuth } from '~~/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  const { user, loading } = useAuth()

  if (process.server) return

  while (loading.value) {
    await new Promise(resolve => setTimeout(resolve, 10))
  }

  if (user.value && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/profile')
  }
})
