<script setup lang="ts">
import { Github, Linkedin, Instagram } from 'lucide-vue-next'
</script>

<template>
  <section class="bg-neutral-primary p-6 rounded-xl max-w-4xl mx-auto">
    <!-- Titel -->
    <h2 class="text-2xl font-semibold text-heading mb-6 text-center">Over mij</h2>

    <!-- Image + tekst -->
    <div class="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
      <img 
        src="/images/me.webp" 
        alt="Senne Cockx" 
        class="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover flex-shrink-0"
      />

      <p class="text-neutral-700 max-w-xl">
        Hey! Ik ben Senne Cockx, een {{ new Date().getFullYear() - 2006 - (new Date() < new Date(new Date().getFullYear(), 2, 13) ? 1 : 0) }}-jarige junior developer uit België. Al sinds mijn jeugd wou ik leren programmeren. Uiteindelijk ben ik beginnen programmeren in het vijfde middelbaar. En nu, na het middelbaar doe ik een graduaat programmeren om mijn kennis en vooral praktische vaardigheden verder uit te breiden.
      </p>
    </div>

    <!-- Socials -->
    <div class="flex flex-col items-center mt-6 gap-3">
      <p class="text-gray-600 mb-2 font-medium">Socials</p>
      <div class="flex gap-4">
        <a href="https://www.linkedin.com/in/je-gebruikersnaam/" target="_blank" rel="noopener noreferrer"
           class="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
          <Linkedin class="w-5 h-5"/>
        </a>

        <a href="https://github.com/SC0DAH" target="_blank" rel="noopener noreferrer"
           class="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition">
          <Github class="w-5 h-5"/>
        </a>

        <a href="https://instagram.com/sennecx" target="_blank" rel="noopener noreferrer"
           class="flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
          <Instagram class="w-5 h-5"/>
        </a>
      </div>
    </div>
  </section>
</template>
