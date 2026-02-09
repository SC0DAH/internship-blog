<script setup lang="ts">
import type { BlogPost } from '~~/app/interfaces/types'
import { useBlog } from '~~/composables/useBlog'

const { getLatestBlog } = useBlog()

const {data : latestBlog, pending} = useAsyncData<BlogPost | null>("latest-blog", () => getLatestBlog(), {server: false})
</script>
<template>
  <section class="bg-gray-100 py-12">
    <div class="max-w-screen-md mx-auto px-4">
      <h2 class="text-2xl font-semibold text-heading mb-6 text-center">
        Laatste Blog
      </h2>

      <div v-if="pending" class="bg-white p-6 rounded-xl shadow-md animate-pulse space-y-4">
        <div class="h-6 bg-gray-200 rounded w-2/3"></div>
        <div class="h-4 bg-gray-200 rounded"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>

      <NuxtLink
        v-else-if="latestBlog"
        :to="`/blogs/${latestBlog.id}`"
        class="block bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
      >
        <h3 class="text-xl font-bold mb-2">{{ latestBlog.title }}</h3>
        <p class="text-neutral-700 mb-4 line-clamp-3">
          {{ latestBlog.content.slice(0, 100) }}<span v-if="latestBlog.content.length > 100">...</span>
        </p>
        <p class="text-blue-600 hover:underline font-medium">Lees meer</p>
      </NuxtLink>

      <p v-else-if="pending" class="text-center text-neutral-500">
        Geen blog beschikbaar
      </p>
    </div>
  </section>
</template>


