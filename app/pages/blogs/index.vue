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

const { user, loading: authLoading } = useAuth();
const { getUserRole } = useAuth();
const role = ref<"user" | "admin" | null>(null);
const selectedTag = ref<string>(""); // tags filteren
const loading = ref(true);

let unsubscribe: (() => void) | null = null;

const allTags = computed(() => {
  const tagsSet = new Set<string>();
  blogs.value.forEach(blog => {
    blog.tags?.forEach(tag => tagsSet.add(tag.name));
  });
  return Array.from(tagsSet);
}); 

const filteredBlogs = computed(() => {
  if (!selectedTag.value) return blogs.value;
  return blogs.value.filter(blog => blog.tags?.some(tag => tag.name === selectedTag.value));
});

onMounted(async () => {
  unsubscribe = getAllBlogsRealtime((data) => {
    blogs.value = data;
    loading.value = false;
  });
});

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
  <div v-if="authLoading" class="max-w-2xl mx-auto p-4 text-center">
    <p class="text-gray-600">Laden...</p>
  </div>

  <div v-else>
    <div class="max-w-2xl mx-auto p-4" v-if="role === 'admin'">
      <h1 class="text-3xl font-bold mb-6 text-center">Nieuwe Blog</h1>
      
      <form @submit.prevent="submitBlog" class="flex flex-col gap-4">
        <input v-model="title" type="text" placeholder="Titel" class="border p-2 rounded" required />
        <textarea v-model="content" placeholder="Content" rows="10" class="border p-2 rounded" required></textarea>
        <input v-model="tags" type="text" placeholder="Tags (gescheiden door komma)" class="border p-2 rounded" />
        <button type="submit" class="bg-gray-800 text-white p-2 rounded hover:bg-gray-600">
          Post Blog
        </button>
      </form>
    </div>

    <div class="max-w-2xl mx-auto p-4 mt-12">
      <div class="flex items-center justify-between mb-6 gap-4">
        <h1 class="text-3xl font-bold">
          Alle Blogs
        </h1>
        <div class="flex items-center gap-2">
          <label for="tag-filter" class="font-medium">Filter op tag:</label>
          <select
            id="tag-filter"
            v-model="selectedTag"
            class="border p-1 rounded">
            <option value="">Alle</option>
            <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>
      </div>

      <template v-if="loading">
        <div v-for="i in filteredBlogs.length + 1" :key="i" class="border p-4 mb-4 rounded-2xl shadow-sm animate-pulse space-y-3">
          <div class="h-6 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </template>

      <div v-else-if="filteredBlogs.length === 0" class="text-center text-gray-500">
        Geen blogs beschikbaar.
      </div>

      <div
        v-else
        v-for="blog in filteredBlogs"
        :key="blog.id"
        class="border p-4 mb-4 rounded-2xl shadow-sm hover:shadow-md transition relative group">
        <NuxtLink :to="`/blogs/${blog.id}`">
          <h2 class="text-xl font-semibold">{{ blog.title }}</h2>

          <p class="text-gray-700 mt-2 leading-relaxed">
            {{ blog.content.slice(0, 100) }}<span v-if="blog.content.length > 100">...</span>
          </p>

          <p class="text-gray-500 text-sm mt-3">
            {{ blog.author.name }} | {{ blog.createdAt?.toLocaleDateString() }}
          </p>

          <p class="text-gray-400 text-sm mt-1" v-if="blog.tags?.length">
            Tags: {{ blog.tags.map(t => t.name).join(', ') }}
          </p>
        </NuxtLink>

        <button 
          v-if="role === 'admin'"
          @click.stop="handleDeleteBlog(blog.id!)"
          class="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Verwijder blog">
          <TrashIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>