<script setup>
  import MoviesShowcase from '../components/MoviesShowcase.vue'
  import BannerHome from '../components/BannerHome.vue'
</script>

<template>
  <main style="margin-top: 66.66px">
    <BannerHome />
    <div class="md:container md:mx-auto mt-12 mb-10 px-5 md:px-5 lg:px-10 sm:px-5">
      <MoviesShowcase showcase-title="Os melhores" size="8"/>

      <MoviesShowcase showcase-title="Comédia" size="8" category="Comédia"/>

      <MoviesShowcase showcase-title="I ❤ Ação" category="Ação"/>
    </div>
  </main>
</template>
