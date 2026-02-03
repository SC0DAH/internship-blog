<script setup>
import { HomeIcon, Bars3Icon, UserIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <nav class="fixed w-full bg-white/70 backdrop-blur-sm border-b border-gray-100 z-50 font-sans">
    <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      
      <!-- Logo -->
      <div class="text-xl font-semibold cursor-pointer">
        sennecx
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-6">
        <button class="w-8 h-8 text-gray-600 hover:text-black transition-colors">
          <HomeIcon class="w-6 h-6"/>
        </button>

        <!-- Nav Links -->
        <button class="text-gray-600 hover:text-black transition-colors">Blog</button>
        <button class="text-gray-600 hover:text-black transition-colors">Skills</button>
        <button class="text-gray-600 hover:text-black transition-colors">Internship</button>
        <button class="w-8 h-8 text-gray-600 hover:text-black transition-colors">
          <UserIcon class="w-6 h-6"/>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="flex items-center md:hidden gap-6">
        <button class="text-gray-600">
          <Bars3Icon class="w-6 h-6"/>
        </button>
      </div>

    </div>
  </nav>
</template>

