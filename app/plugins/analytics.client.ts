import { useAnalytics } from "~~/composables/useAnalytics"

export default defineNuxtPlugin(() => {
  const router = useRouter()
  const { trackPageView } = useAnalytics()

  router.afterEach((to) => {
    const consent = localStorage.getItem('cookie-consent')
    if (consent !== 'true') return
    trackPageView(to.fullPath, to.meta?.title as string | undefined)
  })
})