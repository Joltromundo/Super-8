
<script setup>
    import { useRoute } from 'vue-router';
    import api from './../utils/api'
    import MoviesDetail from '../components/MoviesDetail.vue'
    import MoviesShowcase from '../components/MoviesShowcase.vue'
</script>

<template>
    <main style="margin-top: 66.66px">
        <div class="2xl:container 2xl:mx-auto mt-12 mb-10 px-5 2xl:px-5 2xl:px-10 sm:px-5">
            <MoviesDetail/>
        </div>

        <div class="md:container md:mx-auto mt-12 mb-10 px-5 md:px-5 lg:px-10 sm:px-5">
            <MoviesShowcase showcase-title="Os Piores" size="16"/>
        </div>
    </main>
</template>