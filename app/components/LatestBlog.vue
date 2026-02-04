<template>
  <!-- Volledige breedte voor de grijze achtergrond -->
  <section class="bg-gray-100 py-12">
    <!-- Card gecentreerd en met max-width -->
    <div class="max-w-screen-md mx-auto px-4">
      <h2 class="text-2xl font-semibold text-heading mb-6 text-center">Laatste Blog</h2>
      
      <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <h3 class="text-xl font-bold mb-2">Hoe ik mijn eerste Vue app bouwde</h3>
        <p class="text-neutral-700 mb-4">
          Een korte beschrijving van mijn ervaring en wat ik leerde tijdens het bouwen van mijn eerste Vue project.
        </p>
        <RouterLink to="/blogs" class="text-blue-600 hover:underline font-medium">
          Lees meer
        </RouterLink>
      </div>
    </div>
  </section>
</template>
