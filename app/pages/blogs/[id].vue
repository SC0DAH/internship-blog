<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from 'vue-router';
import { useBlog } from "~~/composables/useBlog";
import { useComments } from "~~/composables/useComments";
import type { BlogComment, BlogPost } from "~/interfaces/types";
import { CalendarIcon } from '@heroicons/vue/24/outline';
import { useAuth } from "~~/composables/useAuth";
import { TrashIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

// Route & blogId
const route = useRoute();
const blogId = route.params.id as string;

// Composables
const { getBlog } = useBlog();
const { getCommentsRealtime, addComment } = useComments();
const { user } = useAuth();

// State
const blog = ref<BlogPost | null>(null);
const pending = ref(true);
const comments = ref<BlogComment[]>([]);
const newComment = ref("");
let unsubscribe: (() => void) | null = null;

// CLIENT-SIDE only: haal blog & comments
onMounted(async () => {
  if (!process.client) return;

  // Blog ophalen
  try {
    blog.value = await getBlog(blogId);
  } catch (err) {
    console.error("Blog ophalen mislukt:", err);
  } finally {
    pending.value = false;
  }

  // Realtime comments
  if (blogId) {
    unsubscribe = getCommentsRealtime(blogId, (data) => {
      comments.value = data;
    });
  }
});

// Clean up
onBeforeUnmount(() => {
  if (unsubscribe) unsubscribe();
});

// Submit comment
const submitComment = async () => {
  if (!process.client) return;
  if (!user.value) return alert("Je moet ingelogd zijn om te reageren!");
  if (!newComment.value.trim()) return alert("Comment mag niet leeg zijn!");

  try {
    await addComment({
      postId: blogId,
      commenterUid: user.value.uid,
      commenterDisplayName: user.value.displayName || "Anoniem",
      content: newComment.value,
    });
    newComment.value = "";
  } catch (err: any) {
    console.error("Comment toevoegen mislukt:", err);
    alert(err.message || "Er is iets misgegaan bij het toevoegen van de reactie.");
  }
};
</script>

<template>
<section class="bg-gray-100 min-h-screen py-12">
  <div class="max-w-3xl mx-auto px-4">
    <NuxtLink
      to="/blogs"
      class="inline-block mb-6 text-gray-600 hover:underline font-medium">
      ← terug naar alle blogs
    </NuxtLink>

    <!-- Skeleton / Loading -->
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

    <!-- Blog content -->
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

    <!-- Comments -->
    <div class="mt-12">
      <h2 class="text-2xl font-semibold mb-4">Reacties</h2>
      <div v-if="comments.length === 0" class="text-gray-500 mb-4">
        Wees de eerste om te reageren!
      </div>
      <div v-for="comment in comments" :key="comment.id" class="border p-4 rounded-lg mb-2">
        <p class="text-sm text-gray-500">
          {{ comment.commenterDisplayName }} • {{ comment.createdAt.toDate().toLocaleString() }}
        </p>
        <p class="mt-1">{{ comment.content }}</p>
      </div>

    <div v-if="user" class="mt-4">
        <div class="relative">
            <textarea
            v-model="newComment"
            @keydown.enter.exact.prevent="submitComment"
            placeholder="Schrijf een reactie..."
            rows="1"
            class="w-full border p-3 pr-24 rounded resize-none"
            ></textarea>

            <button
            @click="submitComment"
            class="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
            >
            <ArrowRightIcon class="w-4 h-4"/>
            </button>
        </div>
    </div>

      <div v-else class="text-gray-500 mt-4">
        Je moet ingelogd zijn om te reageren.
      </div>
    </div>
  </div>
</section>
</template>
