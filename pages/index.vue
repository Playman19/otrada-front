<template>
  <div>
    <Utp />
    <main class="fc index-main">
        <Rest />
        <Bonuses />
        <IndexMapSchema />
        <Advantages />
        <Offers />
        <Items />
        <Ask />
        <FAQ />
    </main>
    <Footer />
  </div>
</template>

<script>
import contentData from '~/config/content'
import Utp from '~/components/v2/index/Utp.vue'
import Rest from '~/components/v2/index/Rest.vue'
import Bonuses from '~/components/v2/index/Bonuses.vue'
import IndexMapSchema from '~/components/v2/index/IndexMapSchema.vue'
import Advantages from '~/components/v2/index/Advantages.vue'
import Offers from '~/components/v2/index/Offers.vue'
import Items from '~/components/v2/index/Items.vue'
import Ask from '~/components/v2/index/Ask.vue'
import FAQ from '~/components/v2/index/FAQ.vue'
import Footer from '~/components/v2/universal/Footer.vue'


export default {
  setup() {
    useHead({
      title: contentData.title || '',
      meta: [
        { name: 'description', content: contentData.meta_description || 'Описание этой страницы' }
      ]
    })

    return {
      contentData
    }
  },
  components: {
    Utp, Rest, Bonuses, IndexMapSchema, Advantages, Offers, Items, Ask, FAQ, Footer
  }
}
</script>

<style scoped>
    .index-main {
        background-color: var(--bg);
        padding-top: 40px;
        padding-bottom: 90px;
    }
</style>
