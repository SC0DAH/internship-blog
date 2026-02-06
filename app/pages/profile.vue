<script setup lang="ts">
import { useAuth } from '~~/composables/useAuth'
definePageMeta({
  middleware: 'my-middleware'
})
const { user } = useAuth()
</script>

<template>
    <div>
        <p>Profile page</p>
        <p>Email: {{ user?.email }}</p>
        <p>Display Name: {{ user?.displayName || 'No display name' }}</p>
        <p>Creation Time: {{ user?.metadata.creationTime }}</p>
        <p>Last Sign In Time: {{ user?.metadata.lastSignInTime }}</p>
    </div>
</template>