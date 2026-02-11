<template>
  <div v-if="showBanner" class="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
    <div class="w-full max-w-5xl p-4 bg-gray-800 text-white rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-3">
      <span>Deze website gebruikt cookies voor analytics en functionaliteit.</span>

      <div class="flex gap-2">
        <button @click="accept" class="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition">
          Accepteren
        </button>
        <button @click="decline" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">
          Weigeren
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const showBanner = ref(false)


const accept = () => {
  localStorage.setItem('cookie-consent', 'true')
  showBanner.value = false
  console.log('Cookies geaccepteerd')
  // TODO: hier later GA laden
}

const decline = () => {
  localStorage.setItem('cookie-consent', 'false')
  showBanner.value = false
  console.log('Cookies geweigerd')
}

onMounted(() => {
  const consent = localStorage.getItem('cookie-consent')
  if (!consent) showBanner.value = true
})
</script>
