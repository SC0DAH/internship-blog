<script setup>
import { HomeIcon, Bars3Icon, UserIcon } from '@heroicons/vue/24/outline'
import {ref } from 'vue'

const isOpen = ref(false);
</script>

<template>
  <nav class="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
    <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      
      <RouterLink to="/" class="inline-flex items-center justify-center h-10 px-4 rounded-full text-heading hover:bg-black/10 hover:text-black transition-colors">
        <span class="self-center text-xl text-heading font-semibold whitespace-nowrap">sennecx</span>
      </RouterLink>

      <ul class="hidden md:flex flex-1 justify-center items-center space-x-8 rtl:space-x-reverse font-medium">
        <li>
          <RouterLink to="/" class="inline-flex items-center justify-center h-10 px-4 rounded-full text-heading hover:bg-black/10 hover:text-black transition-colors">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/blogs" class="inline-flex items-center justify-center h-10 px-4 rounded-full text-heading hover:bg-black/10 hover:text-black transition-colors">Blogs</RouterLink>
        </li>
        <li>
          <RouterLink to="/internship" class="inline-flex items-center justify-center h-10 px-4 rounded-full text-heading hover:bg-black/10 hover:text-black transition-colors">Internship</RouterLink>
        </li>
      </ul>

      <RouterLink to="/profile" class="hidden md:flex items-center justify-center w-10 h-10 rounded-full text-heading hover:text-black hover:bg-black/10 transition-colors">
        <UserIcon class="w-6 h-6"/>
      </RouterLink>

      <div class="flex md:hidden">
        <button @click="isOpen = !isOpen" data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base hover:bg-neutral-secondary-soft focus:outline-none focus:ring-2 focus:ring-neutral-tertiary w-10 h-10 rounded-full text-heading hover:text-black hover:bg-black/10 transition-colors" aria-controls="navbar-sticky" aria-expanded="false">
          <Bars3Icon class="w-6 h-6"/>
        </button>
        <RouterLink to="/profile" class="flex items-center justify-center w-10 h-10 rounded-full text-heading hover:text-black hover:bg-black/10 transition-colors">
        <UserIcon class="w-6 h-6"/>
      </RouterLink>
      </div>
    </div>
  </nav>

  <div
    v-if="isOpen"
    class="md:hidden fixed top-[72px] left-0 w-full z-10 flex justify-center"
  >
    <ul class="flex flex-col item-center gap-2 p-4 font-medium">
      <li>
        <RouterLink @click="isOpen = false" to="/" class="w-full max-w-xs inline-flex items-center justify-center h-11 px-4 rounded-full text-heading hover:text-black hover:bg-black/10 transition-colors">
          Home
        </RouterLink>
      </li>
      <li>
        <RouterLink @click="isOpen = false" to="/blogs" class="w-full max-w-xs inline-flex items-center justify-center h-11 px-4 rounded-full text-heading hover:text-black hover:bg-black/10 transition-colors">
          Blogs
        </RouterLink>
      </li>
      <li>
        <RouterLink @click="isOpen = false" to="/internship" class="w-full max-w-xs inline-flex items-center justify-center h-11 px-4 rounded-full text-heading hover:text-black hover:bg-black/10 transition-colors">
          Internship
        </RouterLink>
      </li>
    </ul>
  </div>
</template>