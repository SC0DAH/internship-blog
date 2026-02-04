<template>
  <section class="flex items-center justify-center bg-gray-50" :style="{ minHeight: 'calc(100vh - 5rem)' }">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h1 class="text-3xl font-bold text-heading mb-6 text-center">Register</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">Naam</label>
          <input
            v-model="name"
            type="text"
            placeholder="Your name"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
          />
        </div>

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
          Register
        </button>
      </form>

      <p class="text-sm text-neutral-500 mt-4 text-center">
        Al een account?
        <NuxtLink to="/login" class="text-blue-600 hover:underline">Login hier</NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

async function handleRegister() {
  console.log('Register attempt:', name.value, email.value, password.value)
}
</script>
