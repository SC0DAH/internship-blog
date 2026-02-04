<template>
  <section class="bg-neutral-primary p-6 rounded-xl text-center">
    <h2 class="text-2xl font-semibold text-heading mb-4">Over mij</h2>
    <p class="text-neutral-700 max-w-xl mx-auto">
        Hey! Ik ben Senne Cockx, een {{ new Date().getFullYear() - 2006 - (new Date() < new Date(new Date().getFullYear(), 2, 13) ? 1 : 0) }}-jarige junior developer uit België. Al sinds mijn jeugd wou ik leren programmeren en programmas en web apps maken. Sinds het vijfde middelbaar leer ik programmeren. En nu, na het middelbaar doe ik een graduaat programmeren om mijn kennis en praktische vaardigheden verder uit te breiden.
    </p>
  </section>
</template>