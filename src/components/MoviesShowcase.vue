<script setup>
    import axios from 'axios'
    import api from './../utils/api'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import IconStart from './icons/IconStart.vue'
</script>

<template>
    <div class="bg-slate-900 rounded-md mt-10">
        <div class="mx-auto max-w-2xl px-4 pb-16 pt-5 sm:px-6 sm:pt-5 sm:pb-16 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-slate-100">{{ showcaseTitle }}</h2>

            <swiper :slides-per-view="4" :space-between="30" @swiper="onSwiper" @slideChange="onSlideChange" :breakpoints="{ 0: { slidesPerView:1 }, 600:{ slidesPerView:1 }, 650:{ slidesPerView:2 }, 1024: {slidesPerView:3}, 1280: {slidesPerView:4} }" class="mt-6 flex gap-8">
                <swiper-slide v-for="movie in movies" class="group relative flex-[0_0_100%] md:flex-[0_0_47%] sm:flex-[0_0_47%] lg:flex-[0_0_31%] xl:flex-[0_0_23%]">
                    <router-link :to="{ name: 'filmesDetail', params: { id: movie.id }}" class="px-2 sm:px-0 block">
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
                </swiper-slide>
            </swiper>
        </div>
        </div>
</template>

<script>
    export default {
        components: {
            Swiper,
            SwiperSlide,
        },
        name: "Movie Showcase",
        props: {
            showcaseTitle: String,
            category: String,
            size: {
                type: String,
                default: '12'
            }
        },
        data(){
            return {
                title: '',
                movies: []
            }
        },
        mounted() {
            let current = this
            var url = `/movies?size=${current.size}`
            if(current.category){
                url = `/movies?size=${current.size}&category=${current.category}`
            }

            api
                .get(url)
                .then((res) => {
                    this.movies = res.data
                })
                .catch((error) => {
                    console.log(error)
                })
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