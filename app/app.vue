<script setup>
useHead({
  titleTemplate: '%s - Sennecx'
})
import CookieBanner from '~/components/CookieBanner.vue'
</script>

<template>
  <div>
    <NuxtLayout/>
    <CookieBanner />
  </div>
</template>