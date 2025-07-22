<template>
    <section class="navigate-cards flex big-ly">
        <h2 class="tc f600 accent">Жилые дома</h2>
        <div class="fc modal-mod" 
            v-for="card in cards"
            :aria-label="`Перейти к просмотру ${card.title}`"
            @click="openModal(card)"
        >
            <img :src="card.imgpath" :alt="`${card.title} общее фото`">
            <h3 class="accent-dark hover-accent-green-light f600">{{ card.title }}</h3>
            <article class="alternate-dark">{{ card.items }}</article>
            <article class="accent-green-light f500">{{ card.commerce }}</article>
            <button class="accent-btn btn180 off-btn mt1-5em modal-mod">Подробнее</button>
    </div>

        <Modal :show="showModal" :data="modalData" @close="closeModal">
          <template #default="{ data }">
            <div class="flexadapt-tab">
                <section class="navigate-cards pb0 flex">
                    <div class="fc modal-mod">
                        <img :src="data.imgpath">
                        <h3 class="accent-dark hover-accent-green-light f600">{{ data.title }}</h3>
                        <article class="alternate-dark">{{ data.items }}</article>
                        <article class="accent-green-light f500">{{ data.commerce }}</article>
                    </div>
                </section>
                <div class="nc-modal-form fc">
                    <span class="f500 accent-dark">Оставьте заявку</span>
                    <input type="text" class="i-text-light mt32 i240" placeholder="Ваше имя">
                    <input type="text" class="i-text-light mt8 i240" placeholder="Номер телефона">
                    <button class="accent-btn btn180 off-btn mt16 asc">Оставить заявку</button>
                </div>
            </div>
          </template>
        </Modal>
    </section>
</template>
<script>
import { ref } from 'vue';
import Modal from '../modals/Modal.vue';




export default {
    data() {
        return {
            showModal: ref(false),
            modalData: ref(null),
            cards: [
                {
                    title: 'Коттеджный посёлок Отрада',
                    items: 'Дома в с.Отрадное Брянского района',
                    commerce: 'Дома от 60 000 р/м2',
                    imgpath: '/navigate-cards/1.webp'
                },
                {
                    title: 'Дома в Толмачево',
                    items: 'Дома в Толмачево',
                    commerce: 'Дома от 60 000 р/м2',
                    imgpath: '/navigate-cards/2.webp'
                },
                {
                    title: 'Строительство домов',
                    items: 'Строительство домов под заказ',
                    commerce: 'Цена договорная',
                    imgpath: '/navigate-cards/3.webp'
                }
            ]
        }
    },
    methods: {
        openModal(data) {
          this.modalData = data
          this.showModal = true
        },
        closeModal() {
          this.showModal = false
          this.modalData = null
        }

    },
    components: {
        Modal
    }
}
</script>
<style>
/* .navigate-cards > div {
    align-items: center;
}
@media(min-width:1400px) {
    .navigate-cards {
        justify-content: space-between;
    }
}
@media(min-width:1200px) {
    .navigate-cards {
        flex-wrap: wrap;
        padding-bottom: 64px;
    }
    .navigate-cards > h2 {
        flex: 0 100%;
        font-size: 32px;
    }
    .navigate-cards > div {
        padding: 42px 24px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        border-radius: 4px;
        transition: all .2s ease-in-out;
    }
    .navigate-cards > div:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 8px 14px;
    }
    .navigate-cards > div > h3 {
        font-size: 28px;
    }
    .navigate-cards > div > img {
        width: 380px;
        height: 260px;
    }
}
@media(max-width:1199px) {
    .navigate-cards {
        flex-direction: column;
        align-items: center;
        padding-bottom: 34px;
    }
}
@media(min-width:760px) and (max-width:1199px) {
    .navigate-cards > h2 {
        flex: 0 100%;
        font-size: 26px;
    }
    .navigate-cards > div {
        width: 380px;
        padding: 32px 18px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        border-radius: 4px;
        transition: all .2s ease-in-out;
        margin-bottom: 16px;
    }
    .navigate-cards > div > h3 {
        font-size: 24px;
    }
    .navigate-cards > div > img {
        width: 380px;
        height: 254px;
    }
}
@media(min-width:760px) {

    .nc-modal-form {
        margin-left: 32px;
    }
    .nc-modal-form > span {
        font-size: 24px;
    }
}
@media(max-width:759px) {
    .navigate-cards > h2 {
        flex: 0 100%;
        font-size: 21px;
    }
    .navigate-cards > div {
        width: 320px;
        padding: 26px 14px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        border-radius: 6px;
        transition: all .2s ease-in-out;
        margin-bottom: 16px;
    }
    .navigate-cards > div > h3 {
        font-size: 21px;
    }
    .navigate-cards > div > img {
        width: 320px;
        height: 214px;
    }
} */
</style>