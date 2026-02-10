import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuth } from '~~/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  const { user, loading } = useAuth()

  if (loading.value) {
    return
  }

  if (user.value && to.path !== '/') {
    return navigateTo('/')
  }
})