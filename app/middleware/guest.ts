import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuth } from '~~/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  const { user, loading } = useAuth()

  while (loading.value) {
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  if (user.value && to.path !== '/') {
    return navigateTo('/')
  }
})