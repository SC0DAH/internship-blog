<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { useBlog } from "~~/composables/useBlog";
import type { BlogPost } from "~/interfaces/types";
import { CalendarIcon, EyeIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const blogId = route.params.id as string;

const { getBlog } = useBlog();

const {data : blog, pending} = useAsyncData<BlogPost | null>("blog", () => getBlog(blogId), {server: false})
</script>

<template>
  <section class="bg-gray-100 min-h-screen py-12">
    <div class="max-w-3xl mx-auto px-4">
      <NuxtLink
        to="/blogs"
        class="inline-block mb-6 text-gray-600 hover:underline font-medium">
        ← terug naar alle blogs
      </NuxtLink>

      <div v-if="pending" class="bg-white p-8 rounded-xl shadow-md space-y-6 animate-pulse">
        <div class="h-10 bg-gray-200 rounded w-3/4"></div>

        <div class="flex items-center gap-4">
          <div class="h-4 bg-gray-200 rounded w-16"></div>
          <div class="h-4 bg-gray-200 rounded w-32"></div>
        </div>

        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded w-4/6"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        <div class="flex items-center gap-2 mt-2">
          <div class="h-5 w-5 bg-gray-200 rounded-full"></div>
          <div class="h-4 bg-gray-200 rounded w-28"></div>
        </div>
      </div>

      <div v-else-if="blog" class="bg-white p-8 rounded-xl shadow-md space-y-6">
        <h1 class="text-3xl font-bold text-gray-900">{{ blog.title }}</h1>

        <div class="text-sm text-gray-500 flex items-center gap-4">
          <span>Views: {{ blog.views }}</span>
          <span>Tags: {{ blog.tags?.map(tag => tag.name).join(', ') }}</span>
        </div>

        <div class="prose prose-md max-w-full text-gray-700">
          <p v-for="(paragraph, index) in blog.content.split('\n')" :key="index">
            {{ paragraph }}
          </p>
        </div>

        <div class="text-sm text-gray-500 flex items-center gap-2">
          <CalendarIcon class="w-5 h-5"/>
          <span>Gepubliceerd op: {{ blog.createdAt.toLocaleDateString() }}</span>
        </div>
      </div>

      <div v-else class="bg-white p-8 rounded-xl shadow-md text-center text-gray-500">
        Deze blog werd niet gevonden :/.
      </div>

    </div>
  </section>
</template>

