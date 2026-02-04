<template>
  <section class="flex items-center justify-center bg-gray-50" :style="{ minHeight: 'calc(100vh - 5rem)' }">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h1 class="text-3xl font-bold text-heading mb-6 text-center">Login</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-neutral-950 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
        >
          Login
        </button>
      </form>

      <p class="text-sm text-neutral-500 mt-4 text-center">
        Nog geen account?
        <NuxtLink to="/register" class="text-blue-600 hover:underline">Registreer hier</NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

async function handleLogin() {
  console.log('Login attempt:', email.value, password.value)
  // TODO: API call naar /api/login
}
</script>
