<template>
  <section class="max-w-3xl mx-auto p-6 bg-white rounded-xl mt-12">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-900">Internship</h1>
    
    <div class="flex flex-col md:flex-row items-center gap-10">
      <img 
        :src="sdpImg" 
        alt="SDP logo" 
        class="w-32 h-32 md:w-40 md:h-40 object-contain rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"/>
      
      <p class="text-gray-700 text-lg leading-relaxed text-center md:text-left">
        Ik loop van februari tot mei 2026 stage bij SDP Retail by Alistar, een IT‑bedrijf 
        dat zich specialiseert in software- en technologische oplossingen voor de retailsector. 
        SDP biedt onder andere POS-systemen, ERP-software, cloud-integraties en Business Intelligence-oplossingen, 
        waarmee bedrijven hun processen kunnen optimaliseren en digitaliseren. 
        Tijdens mijn stage krijg ik de kans om mee te werken aan echte projecten, om zo ervaring op te doen.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import sdpImg from '~/assets/sdp.png'
useHead({
  title: 'Internship'
})
</script>
