<template>
  <section
    class="flex items-center justify-center bg-gray-50"
    :style="{ minHeight: 'calc(100vh - 5rem)' }"
  >
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
            <div class="relative flex items-center">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none pr-10"
              />

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 flex items-center justify-center h-full text-gray-400 hover:text-gray-700 focus:outline-none"
              >
                <EyeIcon v-if="!showPassword" class="w-5 h-5" />
                <EyeSlashIcon v-else class="w-5 h-5" />
              </button>
            </div>
        </div>
        
        

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-neutral-950 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50"
        >
          {{ loading ? "Logging in..." : "Login" }}
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "~~/composables/useAuth";
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { useAnalytics } from "~~/composables/useAnalytics";
definePageMeta({
  middleware: 'guest'
})

useHead({
  title: 'Login'
})

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const showPassword = ref(false);
const { trackEvent } = useAnalytics()

const router = useRouter();
const { loginUser } = useAuth();

async function handleLogin() {
  error.value = "";
  loading.value = true;

  if (!email.value || !password.value) {
    error.value = "Vul zowel email als wachtwoord in.";
    loading.value = false;
    return;
  }

  try {
    await loginUser(email.value, password.value);
    trackEvent('login', { method: 'email' });
    router.push("/");
  } catch (err: any) {
    console.error(err);
    if (err.code === "auth/user-not-found") {
      error.value = "Gebruiker niet gevonden.";
    } else if (err.code === "auth/wrong-password") {
      error.value = "Wachtwoord incorrect.";
    } else if (err.code === "auth/invalid-email") {
      error.value = "Ongeldig emailadres.";
    }
    else {
      console.error("Login error:", err.message);
      error.value = err?.message || "Er ging iets mis bij login.";
    }
  } finally {
    loading.value = false;
  }
}
</script>
