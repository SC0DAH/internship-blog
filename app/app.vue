<script setup>
import { HomeIcon, Bars3Icon, UserIcon } from '@heroicons/vue/24/outline'
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
        <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base hover:bg-neutral-secondary-soft focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-sticky" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>