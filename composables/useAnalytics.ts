import { logEvent, setAnalyticsCollectionEnabled } from 'firebase/analytics'

export const useAnalytics = () => {
  const { $getAnalyticsInstance } = useNuxtApp()

  const enableAnalytics = () => {
    const analytics = $getAnalyticsInstance()
    if (!analytics) return
    setAnalyticsCollectionEnabled(analytics, true)
  }

  const disableAnalytics = () => {
    const analytics = $getAnalyticsInstance()
    if (!analytics) return
    setAnalyticsCollectionEnabled(analytics, false)
  }

  const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
    const consent = localStorage.getItem('cookie-consent')
    if (consent !== 'true') return
    const analytics = $getAnalyticsInstance()
    if (!analytics) return
    logEvent(analytics, eventName, params)
  }

  const trackPageView = (pagePath: string, pageTitle?: string) => {
    trackEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle ?? document.title,
    })
  }

  return { enableAnalytics, disableAnalytics, trackEvent, trackPageView }
}