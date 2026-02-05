<template>
  <section
    class="flex items-center justify-center bg-gray-50"
    :style="{ minHeight: 'calc(100vh - 5rem)' }"
  >
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h1 class="text-3xl font-bold text-heading mb-6 text-center">Register</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Naam -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">Naam</label>
          <input
            v-model="name"
            type="text"
            placeholder="Your name"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-neutral-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
          />
        </div>

        <!-- Error message -->
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

        <!-- Success message -->
        <p v-if="success" class="text-sm text-green-600">{{ success }}</p>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-neutral-950 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50"
        >
          {{ loading ? "Registering..." : "Register" }}
        </button>
      </form>

      <p class="text-sm text-neutral-500 mt-4 text-center">
        Al een account?
        <NuxtLink to="/login" class="text-blue-600 hover:underline">
          Login hier
        </NuxtLink>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "~~/composables/useAuth";

const name = ref("");
const email = ref("");
const password = ref("");

const error = ref("");
const success = ref("");
const loading = ref(false);

const { registerUser } = useAuth();

async function handleRegister() {
  error.value = "";
  success.value = "";

  if (!name.value || !email.value || !password.value) {
    error.value = "Vul alle velden in.";
    return;
  }

  try {
    loading.value = true;
    console.log("Register start");
    const res = await registerUser(name.value, email.value, password.value);
    console.log("Register end");
    success.value = res.message;

    // reset form
    name.value = "";
    email.value = "";
    password.value = "";
  } catch (err: any) {
    error.value = err?.message || "Er ging iets mis bij registreren.";
  } finally {
    loading.value = false;
  }
}
</script>