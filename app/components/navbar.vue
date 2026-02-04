<script setup>
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <nav class="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
    <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      
      <!-- Logo -->
      <NuxtLink  to="/" class="inline-flex items-center justify-center h-10 px-4 rounded-full text-heading hover:bg-black/10 hover:text-black transition-colors">
        <span class="self-center text-xl text-heading font-semibold whitespace-nowrap">sennecx</span>
      </NuxtLink>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex flex-1 justify-center items-center space-x-8 font-medium">
        <li><NuxtLink  to="/" class="inline-flex items-center justify-center h-10 px-4 rounded-full text-heading hover:bg-black/10 hover:text-black transition-colors">Home</NuxtLink></li>
        <li><NuxtLink  to="/blogs" class="inline-flex items-center justify-center h-10 px-4 rounded-full text-heading hover:bg-black/10 hover:text-black transition-colors">Blogs</NuxtLink></li>
        <li><NuxtLink  to="/internship" class="inline-flex items-center justify-center h-10 px-4 rounded-full text-heading hover:bg-black/10 hover:text-black transition-colors">Internship</NuxtLink></li>
      </ul>

      <!-- Desktop Profile Icon -->
      <NuxtLink  to="/profile" class="hidden md:flex items-center justify-center w-10 h-10 rounded-full text-heading hover:text-black hover:bg-black/10 transition-colors">
        <UserIcon class="w-6 h-6"/>
      </NuxtLink>

      <!-- Mobile Hamburger + Profile -->
      <div class="flex md:hidden items-center gap-2">
        <button @click="isOpen = !isOpen" class="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/10 transition-colors">
          <Bars3Icon v-if="!isOpen" class="w-6 h-6"/>
          <XMarkIcon v-else class="w-6 h-6"/>
        </button>
        <NuxtLink  to="/profile" class="flex items-center justify-center w-10 h-10 rounded-full text-heading hover:text-black hover:bg-black/10 transition-colors">
          <UserIcon class="w-6 h-6"/>
        </NuxtLink>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu Overlay met blur -->
  <Transition
    enter-active-class="transition duration-250 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="isOpen"
      class="md:hidden fixed inset-0 bg-white/80 backdrop-blur-md z-10 flex flex-col items-center pt-24"
    >
      <ul class="flex flex-col items-center gap-2 p-4 font-medium">
        <li>
          <NuxtLink  @click="isOpen = false" to="/" class="w-full max-w-xs inline-flex items-center justify-center h-11 px-4 rounded-full text-heading hover:text-black hover:bg-black/10 transition-colors">
            Home
          </NuxtLink>
        </li>
        <li>
          <NuxtLink  @click="isOpen = false" to="/blogs" class="w-full max-w-xs inline-flex items-center justify-center h-11 px-4 rounded-full text-heading hover:text-black hover:bg-black/10 transition-colors">
            Blogs
          </NuxtLink>
        </li>
        <li>
          <NuxtLink  @click="isOpen = false" to="/internship" class="w-full max-w-xs inline-flex items-center justify-center h-11 px-4 rounded-full text-heading hover:text-black hover:bg-black/10 transition-colors">
            Internship
          </NuxtLink>
        </li>
      </ul>
    </div>
  </Transition>
</template>
