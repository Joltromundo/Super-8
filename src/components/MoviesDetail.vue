
<script setup>
    import { useRoute } from 'vue-router'
    import api from './../utils/api'
    import IconStart from './icons/IconStart.vue'
    import 'atropos/css'
    import Atropos from 'atropos/vue';
</script>

<template>
    <div class="">
        <div class="pt-6">
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
                    <li>
                        <div class="flex items-center">
                            <a href="#" class="mr-2 text-sm font-medium text-slate-100">Filmes</a>
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true"
                                class="h-5 w-4 text-gray-300">
                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                            </svg>
                        </div>
                    </li>

                    <li class="text-sm">
                        <a href="#" aria-current="page" class="font-medium text-slate-50 hover:text-slate-100">{{ movie.title }}</a>
                    </li>
                </ol>
            </nav>

            <div class="flex flex-col items-center mb-12 md:flex-row">
                <!-- Image gallery -->
                <div class="mx-auto mt-6 max-w-2xl w-full flex-[0_0_100%] sm:flex-[0_0_100%] md:flex-[0_0_35%]">
                    <div class="aspect-h-4 aspect-w-3 rounded-lg lg:block w-full">
                        <atropos :rotateXMax="50" :rotateYMax="50" :scale="2" class="my-atropos relative overflow-visible">
                            <img v-bind:src="'https://movieapi.myspacegarden.com/public/uploads/posters/' + movie.poster"
                            :alt="movie.title" class="h-auto w-full object-cover object-center border border-l-0 border-b-[10px] border-r-8 border-t-[10px] border-neutral-900">

                            <span class="top bg-neutral-950 absolute top-0 left-0 h-8 w-full origin-top-left" style="transform: translateZ(-2rem) rotateX(90deg)"></span>
                            <span class="bottom bg-neutral-950 absolute bottom-0 left-0 h-8 w-full origin-bottom-left" style="transform: translateZ(0) rotateX(90deg)"></span>
                            <span class="left border-b-[10px] border-t-[10px] border-neutral-900 bg-neutral-950 top absolute top-0 left-[1px] h-full w-8 origin-left bg-left bg-cover" style="transform: translateZ(0) rotateY(90deg);" :style="'background-image: url(https://movieapi.myspacegarden.com/public/uploads/posters/' + movie.poster + ')'"></span>
                            <span class="right bg-neutral-950 top absolute top-0 right-0 h-full w-8 origin-right" style="transform: translateZ(-2rem) rotateY(90deg)"></span>
                        </atropos>
                    </div>
                </div>

                <!-- Product info -->
                <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24 lg:pt-16">
                    <div class="block sm:flex justify-between items-center lg:col-span-2 lg:pr-8">
                        <h1 class="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
                            {{ movie.title }}

                            <span class="release text-sm font-normal text-sm text-gray-500">
                                ({{ getYear(movie.release) }})
                            </span>
                        </h1>

                        <p class="flex items-center justify-left sm:justify-between mt-3 text-lg font-medium text-slate-50">
                            <span class="text-xs font-normal text-gray-500 order-3 sm:order-1"><strong class="text-gray-500">{{ movie.minutes }}</strong> minutos</span>

                            <i class="text-xs text-gray-500 font-normal px-2 order-2">•</i>

                            <span class="rating flex items-center gap-1 order-1 sm:order-3">
                                <IconStart/> {{ movie.rating }}
                            </span>
                        </p>
                    </div>

                    <div
                        class="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
                        <!-- Description and details -->
                        <div>
                            <h3 class="sr-only">Description</h3>

                            <div class="space-y-6">
                                <p class="text-base text-slate-100">{{ movie.synopsis }}</p>
                            </div>
                        </div>

                        <div class="mt-3">
                            <ul class="flex flex-wrap gap-x-2">
                                <p v-if="verifyArray(movie.categories)" v-for="category in movie.categories" class="mt-1 text-sm text-gray-600 py-1 px-3 bg-slate-800 rounded-md"> {{ category }}</p>

                                <p v-else class="mt-1 text-sm text-gray-600 py-1 px-3 bg-slate-800 rounded-md"> {{ movie.categories }}</p>
                            </ul>
                        </div>

                        <div class="mt-10 space-y-6">
                            <div class="flex flex-col gap-x-8">
                                <div class="item block text-center md:text-left md:flex items-center gap-x-5 py-4 px-8 bg-slate-900 rounded-sm">
                                    <h3 class="text-sm mb-2 md:mb-0 font-medium text-slate-100">Starring:</h3>

                                    <div>
                                        <ul role="list" class="list-none text-sm">
                                            <li v-if="verifyArray(movie.stars)" v-for="star in movie.stars" class="relative inline-block mr-5 text-slate-50 even:px-5 even:before:content-['•'] even:before:h-full even:before:absolute even:before:left-0 even:before:top-0 even:before:bottom-0 even:before:m-auto even:after:content-['•'] even:after:h-full even:after:absolute even:after:right-0 even:after:top-0 even:after:bottom-0 even:after:m-auto last:after:hidden">
                                                <span class="text-slate-100">{{ star }}</span>
                                            </li>

                                            <li v-else class="inline-block mr-5 text-slate-50">
                                                <span class="text-slate-100">{{ movie.stars }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <hr class="border-slate-950 border-[1px]"/>
                                <div class="item block text-center md:text-left md:flex items-center gap-x-5 py-4 px-8 bg-slate-900 rounded-sm">
                                    <h3 class="text-sm mb-2 md:mb-0 font-medium text-slate-100">Wrote by:</h3>

                                    <div>
                                        <ul role="list" class="list-none text-sm">
                                            <li v-if="verifyArray(movie.writers)" v-for="writer in movie.writers" class="relative inline-block mr-5 text-slate-50 even:px-5 even:before:content-['•'] even:before:h-full even:before:absolute even:before:left-0 even:before:top-0 even:before:bottom-0 even:before:m-auto even:after:content-['•'] even:after:h-full even:after:absolute even:after:right-0 even:after:top-0 even:after:bottom-0 even:after:m-auto last:after:hidden">
                                                <span class="text-slate-100">{{ writer }}</span>
                                            </li>

                                            <li v-else class="inline-block mr-5 text-slate-50">
                                                <span class="text-slate-100">{{ movie.writers }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <hr class="border-slate-950 border-[1px]"/>
                                <div class="item block text-center md:text-left md:flex items-center gap-x-5 py-4 px-8 bg-slate-900 rounded-sm">
                                    <h3 class="text-sm mb-2 md:mb-0 font-medium text-slate-100">Direct by:</h3>

                                    <div>
                                        <ul role="list" class="list-none text-sm">
                                            <li v-if="verifyArray(movie.director)" v-for="director in movie.director" class="relative inline-block mr-5 text-slate-50 even:px-5 even:before:content-['•'] even:before:h-full even:before:absolute even:before:left-0 even:before:top-0 even:before:bottom-0 even:before:m-auto even:after:content-['•'] even:after:h-full even:after:absolute even:after:right-0 even:after:top-0 even:after:bottom-0 even:after:m-auto last:after:hidden">
                                                <span class="text-slate-100">{{ director }}</span>
                                            </li>

                                            <li v-else class="inline-block mr-5 text-slate-50">
                                                <span class="text-slate-100">{{ movie.director }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                movie: [],
            }
        },
        components: {
            Atropos,
        },
        mounted() {
            const route = useRoute()
            const id = route.params.id
            var url = `/movies/${id}`

            api
                .get(url)
                    .then((res) => {
                        this.movie = res.data

                        window.scrollTo(0,0)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                    
        },
        watch: {
            '$route' (to, from) {
                const id = to.params.id
                var url = `/movies/${id}`

                api
                    .get(url)
                        .then((res) => {
                            this.movie = res.data

                            window.scrollTo(0,0)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
            }
        },
        methods: {
            verifyArray: function (array) {
                var result = Array.isArray(array);

                return result
            },
            getYear: function (string) {
                if(string){
                    const date = string.split('-')

                    return date[0]
                }
            }
        }
    }
</script>