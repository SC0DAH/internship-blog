<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from 'vue-router';
import { useBlog } from "~~/composables/useBlog";
import { useComments } from "~~/composables/useComments";
import type { BlogComment, BlogPost } from "~/interfaces/types";
import { CalendarIcon } from '@heroicons/vue/24/outline';
import { useAuth } from "~~/composables/useAuth";
import { TrashIcon, ArrowRightIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

const route = useRoute();
const blogId = route.params.id as string;

const { getBlog } = useBlog();
const { getCommentsRealtime, addComment, deleteComment } = useComments();
const { user, getUserRole } = useAuth();

const blog = ref<BlogPost | null>(null);
const pending = ref(true);
const comments = ref<BlogComment[]>([]);
const newComment = ref("");
const role = ref<"user" | "admin" | null>(null);
let unsubscribe: (() => void) | null = null;

onMounted(async () => {
  if (!process.client) return;

  try {
    blog.value = await getBlog(blogId);
  } catch (err) {
    console.error("Blog ophalen mislukt:", err);
  } finally {
    pending.value = false;
  }

  if (blogId) {
    unsubscribe = getCommentsRealtime(blogId, (data) => {
      comments.value = data;
    });
  }
});

onBeforeUnmount(() => {
  if (unsubscribe) unsubscribe();
});

watch(user, async (newUser) => {
  if (newUser) {
    role.value = await getUserRole();
  } else {
    role.value = null;
  }
}, { immediate: true });

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

const handleDeleteComment = async (commentId: string) => {
  if (!confirm("Weet je zeker dat je deze reactie wilt verwijderen?")) return;

  try {
    await deleteComment(commentId);
  } catch (err: any) {
    console.error("Reactie verwijderen mislukt:", err);
    alert(err.message || "Er ging iets mis bij het verwijderen.");
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

    <div class="mt-12">
      <h2 class="text-2xl font-semibold mb-4">Reacties</h2>
      <div v-if="comments.length === 0" class="text-gray-500 mb-4">
        Wees de eerste om te reageren!
      </div>
      <div v-for="comment in comments" :key="comment.id" class="border p-4 rounded-lg mb-2 relative">
        <p class="text-sm text-gray-500">
          {{ comment.commenterDisplayName }} • {{ comment.createdAt.toDate().toLocaleString() }}
        </p>
        <p class="mt-1">{{ comment.content }}</p>
        <button
            v-if="role === 'admin' || comment.commenterUid === user?.uid"
            @click.stop="handleDeleteComment(comment.id!)"
            class="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition"
            title="Verwijder reactie">
            <TrashIcon class="w-4 h-4" />
        </button>
      </div>

    <div class="mt-4">
  <div class="relative">
    <textarea
      v-model="newComment"
      :placeholder="user ? 'Schrijf een reactie...' : 'Je moet ingelogd zijn om een comment te kunnen plaatsen'"
      :disabled="!user"
      @keydown.enter.exact.prevent="submitComment"
      rows="1"
      class="w-full border p-3 pr-24 rounded resize-none bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
    ></textarea>

    <button
      @click="submitComment"
      :disabled="!user"
      class="absolute top-1/2 right-2 -translate-y-[55%] bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <template v-if="user">
        <ArrowRightIcon class="w-4 h-4"/>
      </template>
      <template v-else>
        <LockClosedIcon class="w-4 h-4"/>
      </template>
    </button>
  </div>
</div>

    </div>
  </div>
</section>
</template>
