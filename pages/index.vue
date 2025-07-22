<template>
  <div>
    <Slider />
    <main>
        <VisitkaDark />
        <!-- <NavigateCards /> -->
        <InfoBlock  :article="contentData.seo_articles[0]"/>
        <Categories />
        <h2 class="big-ly accent f500 tc fs32-21">Жилые дома</h2>
        <Items />
        <InfoBlock  :article="contentData.seo_articles[1]"/>
    </main>
    <Footer />
  </div>
</template>

<script>
import InfoBlock from '~/components/universal/InfoBlock.vue';
import Footer from '~/components/universal/Footer.vue';
import Items from '~/components/universal/Items.vue';
import VisitkaDark from '~/components/index/VisitkaDark.vue';
import Slider from '~/components/index/Slider.vue';
// import NavigateCards from '~/components/index/NavigateCards.vue';

import contentData from '~/config/content'
import Categories from '~/components/index/Categories.vue';

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
    Footer,
    InfoBlock,
    Items,
    VisitkaDark,
    Slider,
    // NavigateCards,
    Categories
  }
}
</script>

<style>
.ic-btn {
    position: absolute;
}
.items-card {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.items-ly {
    flex-wrap: wrap;
}
.items-card > article {
    justify-self: end;
}
@media(min-width:1400px) {
    .items-card > img {
        width: 317px;
        height: 238px;
    }
}
@media(min-width:1200px) and (max-width:1399px) {
    .items-card > img {
        width: 271px;
        height: 203px;
    }
}
@media(min-width:760px) and (max-width:1199px) {
    .items-card > img {
        width: 216px;
        height: 162px;
    }
}
@media(max-width:759px) {
    .items-card > img {
        width: 100%;
        aspect-ratio: 4/3;
    }
}
@media(min-width:1200px) {
    .items-ly {
        padding: 42px 0;
        gap: 12px;
    }
    .items-card {
        padding: 12px 8px;
        transition: all .2s ease-in-out;
        flex: 0 23%;
        height: 380px;
        border-radius: 4px;
    }
    .items-card:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 8px 14px;
    }
}
@media(min-width:760px) and (max-width:1199px) {
    .items-ly {
        padding: 36px 0;
        gap: 8px;
    }
    .items-card {
        padding: 10px 6px;
        flex: 0 30%;
        height: 360px;
        border-radius: 3px;
    }
}
@media(min-width:760px) {
    .ic-btn {
        right: 4px;
        bottom: 6px;
    }
}
@media(max-width:759px) {
    .items-ly {
        padding: 24px 0;
        gap: 4px;
    }
    .items-card {
        padding: 10px 6px;
        flex: 0 45%;
        
        border-radius: 3px;
    }
    .items-card > article {
        font-size: 12px;
    }
    .items-card > h3 {
        font-size: 16px;
    }
    .items-card > span {
        font-size: 14px;
    }
    .ic-btn {
        right: 4px;
        bottom: 22px;
        width: 24px;
        height: 24px;
    }
}
@media(max-width:400px) {
    .items-card {
        height: 240px;
    }
}
@media(min-width:401px) and (max-width:759px) {
    .items-card {
        height: 280px;
    }
}
</style>
