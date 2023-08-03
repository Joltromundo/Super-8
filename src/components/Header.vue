<script setup lang="ts">
    import IconInfo from "./icons/IconInfo.vue"
    import IconSearch from "./icons/IconSearch.vue"
</script>

<template>
    <header class="bg-slate-800 fixed w-full top-0 left-0 z-10 shadow-md shadow-slate-900">
      <div class="md:container md:mx-auto p-2 flex justify-between items-center">
        <div class="logo">
            <img alt="Super-8 logo" class="logo" src="@/assets/logo.svg" width="95" height="95" />
        </div>

        <nav class="hidden md:flex flex gap-x-20">
            <RouterLink to="/" class="font-bold text-slate-50 text-sm">Página Inicial</RouterLink>
            <RouterLink to="/filmes" class="font-bold text-slate-50 text-sm">Filmes</RouterLink>
            <!-- <RouterLink to="/filmes?category=Mistério" class="font-bold text-slate-50 text-sm">Mistérios</RouterLink> -->
            <RouterLink to="/filmes?category=Drama" class="font-bold text-slate-50 text-sm">Para de Drama</RouterLink>
            <RouterLink to="/filmes?category=Ação" class="font-bold text-slate-50 text-sm">I ❤ Ação</RouterLink>
        </nav>

        <div class="info search flex gap-2 items-center">
            <div class="input-wrapper relative">
                <input type="text" v-model="search" @keyup.enter="searchMovie()" class="rounded-md py-1 px-3 bg-transparent border-2 border-slate-700 outline-none text-slate-50" placeholder="Procurar...">

                <span class="absolute right-2 top-0 bottom-0 m-auto h-5 cursor-pointer" @click="searchMovie()">
                    <IconSearch/>
                </span>
            </div>

            <IconInfo />
        </div>
      </div>
    </header>
</template>

<script lang="ts">
    export default {
        data(){
            return {
                search: ''
            }
        },
        methods: {
            searchMovie: function(){
                const searchQuery = this.search
                const url = `/filmes?search=${searchQuery}`

                this.$router.push({ 
                    name: 'filmes', 
                    query: { 
                        search: this.search
                    }
                });
            }
        }
    }
</script>