<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useBlog } from "~~/composables/useBlog";
import type { BlogPost } from "~/interfaces/types";
import { useAuth } from '~~/composables/useAuth'
import { TrashIcon } from '@heroicons/vue/24/outline'

const blogs = ref<BlogPost[]>([]);
const title = ref("");
const content = ref("");
const tags = ref("");
const { getAllBlogsRealtime, createBlog, deleteBlog } = useBlog();

// Gebruik useFirebaseAuth om auth state te volgen
const { user, loading: authLoading } = useAuth();
const { getUserRole } = useAuth();
const role = ref<"user" | "admin" | null>(null);

let unsubscribe: (() => void) | null = null;

onMounted(async () => {
  unsubscribe = getAllBlogsRealtime((data) => {
    blogs.value = data;
  });
});

// Watch voor wanneer user wordt ingeladen
watch(user, async (newUser) => {
  if (newUser) {
    role.value = await getUserRole();
  } else {
    role.value = null;
  }
}, { immediate: true });

onBeforeUnmount(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});

const submitBlog = async () => {
  if (!user.value) {
    return alert("Je moet ingelogd zijn om een blog te posten!");
  }

  if (!title.value.trim() || !content.value.trim()) {
    return alert("Titel en content mogen niet leeg zijn!");
  }

  const newBlog: Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "views"> = {
    title: title.value,
    content: content.value,
    tags: tags.value.split(",").map(t => t.trim()).filter(t => t !== "").map(t => ({ name: t })),
    author: {
      id: user.value.uid,
      name: user.value.displayName || "Anoniem",
    },
  };

  try {
    await createBlog(newBlog);
    alert("Blog succesvol aangemaakt!");
    title.value = "";
    content.value = "";
    tags.value = "";
  } catch (err: any) {
    console.error(err);
    alert(err.message || "Er is iets misgegaan bij het aanmaken van de blog.");
  }
};

const handleDeleteBlog = async (blogId: string) => {
  if (role.value !== 'admin') {
    return alert("Je hebt geen toestemming om blogs te verwijderen!");
  }

  if (!confirm("Weet je zeker dat je deze blog wilt verwijderen?")) {
    return;
  }

  try {
    await deleteBlog(blogId);
  } catch (err: any) {
    console.error(err);
    alert(err.message || "Er is iets misgegaan bij het verwijderen van de blog.");
  }
};
</script>

<template>
  <!-- Loading state terwijl auth wordt gecontroleerd -->
  <div v-if="authLoading" class="max-w-2xl mx-auto p-4 text-center">
    <p class="text-gray-600">Laden...</p>
  </div>

  <div v-else>
    <!-- Admin form - alleen zichtbaar voor admins -->
    <div class="max-w-2xl mx-auto p-4" v-if="role === 'admin'">
      <h1 class="text-3xl font-bold mb-6 text-center">Nieuwe Blog</h1>
      
      <form @submit.prevent="submitBlog" class="flex flex-col gap-4">
        <input 
          v-model="title"
          type="text" 
          placeholder="Titel" 
          class="border p-2 rounded"
          required
        />

        <textarea 
          v-model="content" 
          placeholder="Content" 
          rows="10"
          class="border p-2 rounded"
          required
        ></textarea>

        <input 
          v-model="tags"
          type="text" 
          placeholder="Tags (gescheiden door komma)" 
          class="border p-2 rounded"
        />

        <button 
          type="submit"
          class="bg-gray-800 text-white p-2 rounded hover:bg-gray-600"
        >
          Post Blog
        </button>
      </form>
    </div>
    
    <!-- Blogs lijst -->
    <div class="max-w-2xl mx-auto p-4 mt-12">
      <h1 class="text-3xl font-bold mb-6 text-center">Alle Blogs</h1>
      <p v-if="blogs.length === 0" class="text-center text-gray-600 mb-8">
        Er zijn nog geen blogs beschikbaar.
      </p>
      <div
        v-else
        v-for="blog in blogs"
        :key="blog.id"
        class="border p-4 mb-4 rounded-2xl shadow-sm hover:shadow-md transition relative group"
      >
        <NuxtLink :to="`/blogs/${blog.id}`">
          <h2 class="text-xl font-semibold">{{ blog.title }}</h2>

          <p class="text-gray-700 mt-2 leading-relaxed">
            {{ blog.content.slice(0, 100) }}<span v-if="blog.content.length > 100">...</span>
          </p>

          <p class="text-gray-500 text-sm mt-3">
            door {{ blog.author.name }} | {{ blog.createdAt?.toLocaleDateString() }}
          </p>

          <p class="text-gray-400 text-sm mt-1" v-if="blog.tags?.length">
            Tags: {{ blog.tags.map(t => t.name).join(', ') }}
          </p>
        </NuxtLink>

        <!-- Delete button - alleen zichtbaar voor admins -->
        <button 
          v-if="role === 'admin'"
          @click.stop="handleDeleteBlog(blog.id!)"
          class="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Verwijder blog"
        >
          <TrashIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>