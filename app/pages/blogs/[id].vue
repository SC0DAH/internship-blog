<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { useBlog } from "~~/composables/useBlog";
import type { BlogPost } from "~/interfaces/types";

const route = useRoute()

const blog = ref<BlogPost | null>(null);
const blogId = route.params.id as string;

const { getBlog } = useBlog();

onMounted(async () => {
  blog.value = await getBlog(blogId);
});
</script>

<template>
    <div>Blog detail page</div>
</template>