<template>
    <nav id="cases" class="big-ly items-ly flex">
        <NuxtLink v-for="item in houses.data" 
            :to="`/houses/${item.id}`"
            class="items-card fc modal-mod"
            :aria-label="`Перейти к просмотру ${item.title}`"
        >
            <img :src="item.main_img_url" :alt="`Фото ${item.title}`">
            <h3 class="accent f500">{{ item.title }}</h3>
            <span class="alternate-dark f600">{{ item.price_formatted }}</span>
            <article class="accent-green-light">{{ item.location }}</article>
            <button class="bgimg arrow s32 off-btn ic-btn modal-mod"></button>
        </NuxtLink>
    </nav>
</template>
<script setup>
import { useApi } from '~/composables/general.js'

const { getHouses } = useApi()
const { data: houses, pending, error } = await getHouses()
</script>
<style>
    
</style>