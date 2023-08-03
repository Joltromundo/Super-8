<script setup>
    import axios from 'axios'
    import { useRoute } from 'vue-router'
    import api from './../utils/api'
    import IconStart from './icons/IconStart.vue'
</script>

<template>
    <div class="container mt-28">
        <nav aria-label="Breadcrumb">
            <ol role="list" class="flex max-w-2xl items-center space-x-2 lg:max-w-7xl">
                <li>
                    <div class="flex items-center">
                        <a href="#" class="mr-2 text-sm font-medium text-slate-100">Página Inicial</a>
                        <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                            class="h-5 w-4 text-gray-300">
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                        </svg>
                    </div>
                </li>
              
                <li class="text-sm">
                    <a v-if="title" href="#" aria-current="page" class="font-medium text-slate-50 hover:text-slate-100">{{ title }}</a>

                    <a v-else href="#" aria-current="page" class="font-medium text-slate-50 hover:text-slate-100">Filmes</a>
                </li>
            </ol>
        </nav>

        <h1 v-if="title" class="text-2xl font-bold tracking-tight text-slate-100 mb-10 mt-5">{{ title }}</h1>
        <h1 v-else class="text-2xl font-bold tracking-tight text-slate-100 mb-10 mt-5">Todos os Filmes</h1>

        <div class="bg-slate-900 rounded-md">
            <div class="mx-auto max-w-2xl px-4 pb-16 pt-5 sm:px-6 sm:pt-5 sm:pb-16 lg:max-w-7xl lg:px-8">
                <div class="mt-6 flex justify-left flex-wrap gap-x-5 sm:gap-x-[%6] md:gap-x-[%6] lg:gap-x-[%8] gap-y-10">
                    <div v-for="movie in movies" class="group relative flex-[0_0_100%] sm:flex-[0_0_47%] md:flex-[0_0_47%] lg:flex-[0_0_23%]">
                        <router-link :to="{ name: 'filmesDetail', params: { id: movie.id }}">
                            <div class="h-[40rem] sm:h-96 rounded-sm min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden bg-slate-900 lg:aspect-none group-hover:opacity-75">
                                <img v-bind:src="'https://movieapi.myspacegarden.com/public/uploads/posters/' + movie.poster" :alt="movie.title" class="h-full w-full object-cover object-center lg:h-full lg:w-full border border-l-0 border-b-8 border-r-8 border-t-8 border-stone-950">
                            </div>

                            <div class="mt-3 flex justify-between">
                                <div class="w-full">
                                    <ul class="flex flex-wrap gap-x-2">
                                        <p v-if="verifyArray(movie.categories)" v-for="category in movie.categories" class="mt-1 text-sm text-gray-600 py-1 px-3 bg-slate-800 rounded-md"> {{ category }}</p>

                                        <p v-else class="mt-1 text-sm text-gray-600 py-1 px-3 bg-slate-800 rounded-md"> {{ movie.categories }}</p>
                                    </ul>

                                    <h3 class="mt-1 text-sm text-sm text-gray-500">
                                        <a href="#">{{ movie.title }} <span class="text-xs">({{ getYear(movie.release) }})</span></a>
                                    </h3>

                                    <p class="flex items-center justify-between mt-3 text-sm font-medium text-slate-50">
                                        <span class="rating flex items-center gap-1">
                                            <IconStart/> {{ movie.rating }}
                                        </span>

                                        <span class="text-xs font-normal text-gray-500"><strong class="text-gray-500">{{ movie.minutes }}</strong>m</span>
                                    </p>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Movie Grid",
        props: {
            size: {
                type: String,
                default: '32'
            }
        },
        data(){
            return {
                title: '',
                movies: []
            }
        },
        mounted() {
            const route = useRoute()
            const category = route.query.category
            const search = route.query.search

            let current = this
            var url = `/movies?size=${current.size}`
            if(category){
                url = `/movies?size=${current.size}&category=${category}`
            } else if (search){
                url = `/movies?size=${current.size}&search=${search}`
            }

            api
                .get(url)
                .then((res) => {
                    this.movies = res.data
                    
                    if(category){
                        this.title = route.query.category
                    } else if (search){
                        this.title = `Procurando por: "${route.query.search}"`
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        watch: {
            '$route' (to, from) {
                const category = to.query.category

                let current = this
                var url = `/movies?size=${current.size}`
                if(category){
                    url = `/movies?size=${current.size}&category=${category}`
                }

                api
                    .get(url)
                    .then((res) => {
                        this.movies = res.data

                        this.title = to.query.category
                        window.scrollTo(0,0)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        methods: {
            verifyArray: function(array){
                var result = Array.isArray(array);
        
                return result
            },
            getYear: function(string){
                const date = string.split('-')

                return date[0]
            }
        }
    }
</script>