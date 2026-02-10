<script setup lang="ts">
import { useAuth } from '~~/composables/useAuth'
definePageMeta({
  middleware: 'my-middleware'
})
useHead({
  title: 'Profile'
})

const { user, logoutUser } = useAuth()
const logout = async () => {
  try {
    await logoutUser()
    location.reload()
  } catch (error) {
    console.error("Logout error:", error)
  }
}
</script>

<template>
  <section class="flex items-center justify-center bg-gray-50 min-h-[calc(100vh-5rem)]">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-black">
      <h1 class="text-3xl font-bold text-center mb-6">Profiel</h1>
      <div class="space-y-4 text-center">
        <div class="border-b border-black pb-2">
          <p class="font-medium text-neutral-700">E-mail</p>
          <p class="text-neutral-900">{{ user?.email }}</p>
        </div>

        <div class="border-b border-black pb-2">
          <p class="font-medium text-neutral-700">Display Name</p>
          <p class="text-neutral-900">{{ user?.displayName || 'Geen display name' }}</p>
        </div>

        <div class="border-b border-black pb-2">
          <p class="font-medium text-neutral-700">Account aangemaakt</p>
          <p class="text-neutral-900">{{ user?.metadata.creationTime }}</p>
        </div>

        <div class="border-b border-black pb-2">
          <p class="font-medium text-neutral-700">Laatste login</p>
          <p class="text-neutral-900">{{ user?.metadata.lastSignInTime }}</p>
        </div>
      </div>

      <button @click="logout"
        class="mt-6 w-full bg-neutral-950 text-white py-2 rounded-lg hover:bg-red-500 transition-colors font-semibold">
        Uitloggen
      </button>
    </div>
  </section>
</template>