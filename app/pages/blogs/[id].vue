<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { useBlog } from "~~/composables/useBlog";
import type { BlogPost } from "~/interfaces/types";
import { CalendarIcon, EyeIcon } from '@heroicons/vue/24/outline'

const route = useRoute()

const blog = ref<BlogPost | null>(null);
const blogId = route.params.id as string;

const { getBlog } = useBlog();

onMounted(async () => {
  blog.value = await getBlog(blogId);
});
</script>

<template>
  <section class="bg-gray-100 min-h-screen py-12">
    <div class="max-w-3xl mx-auto px-4">
      <NuxtLink
        to="/blogs"
        class="inline-block mb-6 text-gray-600 hover:underline font-medium"
      >
        ← terug naar alle blogs
      </NuxtLink>

      <div
        v-if="blog"
        class="bg-white p-8 rounded-xl shadow-md space-y-6">
        <h1 class="text-3xl font-bold text-gray-900">{{ blog.title }}</h1>

        <div class="text-sm text-gray-500 flex items-center gap-4">
          <span>Views: {{ blog.views}}</span>
          <span>Tags: {{ blog.tags?.map(tag => tag.name).join(', ') }}</span>
        </div>

        <div class="prose prose-md max-w-full text-gray-700">
          <p v-for="(paragraph, index) in blog.content.split('\n')" :key="index">
            {{ paragraph }}
          </p>
        </div>
        <div class="text-sm text-gray-500 flex items-center gap-4">
            <CalendarIcon class="w-5 h-5"/><span>Gepubliceerd op: {{ blog.createdAt.toLocaleDateString() }}</span>
        </div>
      </div>

      <div
        v-else
        class="bg-white p-8 rounded-xl shadow-md text-center text-gray-500"
      >
        Blog wordt geladen of bestaat niet.
      </div>
    </div>
  </section>
</template>
