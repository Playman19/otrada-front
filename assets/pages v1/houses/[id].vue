<script setup>
import houses from '../../requests/todos/example.json'
import { useRoute } from 'vue-router'
import VisitkaDark from '~/components/index/VisitkaDark.vue';
import Footer from '~/components/universal/Footer.vue';
import Houses from '~/components/houses/Houses.vue';
import { useHead } from '#app';

import { useApi } from '~/composables/general.js'
const { getHouse } = useApi()


const route = useRoute()
const houseId = route.params.id
const house = houses.find(h => h.id === houseId)
// console.log(house)
const {data: data, pending, error } = await getHouse(houseId)

definePageMeta({
  middleware: 'check-house-id'
})

useHead({
  title: `Купить ${data.value?.data.title}` || 'Дом',
  meta: [
    {
      name: 'description',
      content: `Купить частный ${data.value?.data.title} в Брянске от застройщика в ипотеку от 6%! Коттеджные поселки, выгодные цены, готовые и строящиеся варианты. Выбор по площади, району, бюджету.` || `Купить частный дом в Брянске от застройщика в ипотеку от 6%! Коттеджные поселки, выгодные цены, готовые и строящиеся варианты. Выбор по площади, району, бюджету.`
    }
  ]
})

</script>

<script>
export default {
  components: {
    VisitkaDark,
    Footer,
    Houses
  }
}
</script>

<template>
  <header>
    <VisitkaDark />
  </header>
    <main>
      <Houses :data="data.data" />
    </main>
    <Footer />
</template>

<style>
  
</style>