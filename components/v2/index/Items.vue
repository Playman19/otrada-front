<script setup>
import { Icon } from '#components';
import { useApi } from '~/composables/general.js'

const { getHouses } = useApi()
const { data: houses, pending, error } = await getHouses()

</script>

<template>
    <section class="cont-ly" id="items" v-if="houses">
        <h3 class="caps f400 headers tc">Доступные предложения</h3>
        <nav class="items-ly">
            <NuxtLink v-for="item in houses.data"
                :to="`/houses/${item.id}`"
                class="item"
                :aria-label="`Перейти к просмотру ${item.title}`"
            >
                <img :src="item.main_img_url"  :alt="`Фото ${item.title}`">
                <section class="item-info flex sb">
                    <div>
                        <h4 class="dark-font f600 fs21-16">{{ item.title }}</h4>
                        <span class="dark-font fs18-14">{{ item.price_formatted }}</span>
                    </div>
                    <aside>
                        <Icon name="lucide:move-right" class="s24 white" />
                    </aside>
                </section>
            </NuxtLink>
        </nav>
    </section>
</template>

<style scoped>
    .items-ly {
        display: flex;
        flex-wrap: wrap;
    }
    .items-ly > a {
        display: flex;
        flex-direction: column;
        background-color: white;
        overflow: hidden;
    }
    .item-info > aside {
        background: linear-gradient(104.5deg, #0A5A5A 30.06%, #15C0C0 121.36%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item > img {
        box-shadow: 0px 4px 14px 0px #0000003B;
        aspect-ratio: 4/3;
    }
    .item-info {
        width: 90%;
        margin: 0 auto 16px auto;
        align-items: end;
    }
    @media(min-width:1100px) {
        .items-ly > a {
            flex: 0 31%;
            margin-right: 12px;
            margin-bottom: 12px;
        }
    }
    @media(min-width:760px) {
        .item-info > aside  {
            width: 46px;
            height: 46px;
        }
        .item > img, .item {
            border-radius: 27px;
        }
        .items-ly {
            margin-bottom: 100px;
        }
    }
    @media(min-width:760px) and (max-width:1099px) {
        .items-ly > a {
            flex: 0 46%;
            margin-right: 8px;
            margin-bottom: 8px;
        }
    }
    @media(max-width:759px) {
        .item-info > aside  {
            width: 30px;
            height: 30px;
        }
        .item > img, .item {
            border-radius: 16px;
        }
         .items-ly > a {
            margin-bottom: 8px;
         }
        .items-ly {
            margin-bottom: 100px;
        }
    }
</style>