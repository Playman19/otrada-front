<template>
    <nav v-if="data" class="house-crumblist flex cont-ly mt1em mb12 fs16-12">
        <NuxtLink to="/" class="alternate-dark">Главная</NuxtLink>
        <aside class="accent-green-light ml8 mr8">></aside>
        <span class="accent-blue-light">{{ data.title }}</span>
    </nav>
    <section v-if="data" class="pb64">
        <div class="cont-ly flex item-ly">
            <section class="item-left-col">
                <h1 class="accent item-title mt0">{{ data.title }}</h1>
                <div class="item-main-img-ly">
                    <img  :src="selectedImg" :alt="`Главное фото ${data.title}`">
                </div>
                <div class="carousel-cont flex">
                    <img v-for="(img, index) in data.carousel_images"
                        :src="img.image_url"
                        :alt="`Фото ${index} ${data.title}`"
                        :class="{ 'carousel-active': img.image_url === selectedImg }"
                        @click="selectImage(img)"
                    >
                </div>
                <section class="second-hand">
                    <span class="item-price f500 dark-font">{{ formattedPrice(data.price) }} ₽</span>
                    <span class="item-location grey">{{ data.location }}</span>
                    <span class="f500 dark-font">{{ data.address }}</span>
                    <div class="flex second-hand-btns-cont mt24">
                        <button :aria-label="`Оставить заявку на ${data.title}`" @click="openModal(data)" class="sh-ask accent-btn off-btn">Оставить заявку</button>
                        <NuxtLink class="sh-phone alternate-btn tc mt0-6em" :to="contacts.phone1.link" :aria-label="contacts.phone1.aria">{{ contacts.phone1.inner_html }}</NuxtLink>
                        <NuxtLink class="sh-tg accent-blue-light-btn tc mt0-6em" :to="contacts.telegram.link" :aria-label="contacts.telegram.aria">Написать в Телеграм</NuxtLink>
                        <NuxtLink class="sh-wa accent-green-btn tc mt0-6em" :to="contacts.whatsapp.link" :aria-label="contacts.whatsapp.aria">Написать в WhatsApp</NuxtLink>
                    </div>
                </section>
                <ul class="features-list">
                    <li v-for="feature in features">
                        <Icon class="feature-icon" :name="feature.icon" />
                        <span class="grow ml12 dark-font">{{ feature.ru }}</span>
                        <span class="alternate-dark">{{ data[feature.key] }}</span>
                    </li>
                </ul>
                <section class="item-info" >
                    <h2 class="f500 fs21-16 mt1-5em accent-dark">Описание</h2>
                    <article class="item-article dark-font">{{ data.description }}</article>
                </section>
                <div v-if="data.map !== '-'" v-html="data.map" class="item-map"></div>
            </section>
            <section class="fc right-col">
                <span class="item-price f500 dark-font">{{ formattedPrice(data.price) }} ₽</span>
                <span class="item-location grey">{{ data.location }}</span>
                <span class="f500 dark-font">{{ data.address }}</span>
                <div class="fc mt24">
                    <button @click="openModal(data)" :aria-label="`Оставить заявку на ${data.title}`" class="accent-btn off-btn">Оставить заявку</button>
                    <NuxtLink class="alternate-btn tc mt0-6em" :to="contacts.phone1.link" :aria-label="contacts.phone1.aria">{{ contacts.phone1.inner_html }}</NuxtLink>
                    <NuxtLink class="accent-blue-light-btn tc mt0-6em" :to="contacts.telegram.link" :aria-label="contacts.telegram.aria">Написать в Телеграм</NuxtLink>
                    <NuxtLink class="accent-green-btn tc mt0-6em" :to="contacts.whatsapp.link" :aria-label="contacts.whatsapp.aria">Написать в WhatsApp</NuxtLink>
                </div>
            </section>
            
        </div>
        <Items />
    </section>
    <Modal :show="showModal" :data="modalData" @close="closeModal">
        <template #default="{ data }">
            <div class="flexadapt-tab">
                <section class="navigate-cards pb0 flex">
                    <div class="fc modal-mod">
                        <img :src="data.main_img_url">
                        <h3 class="accent-dark hover-accent-green-light f600">{{ data.title }}</h3>
                        <article class="alternate-dark">{{ data.adress }}</article>
                        <article class="accent-green-light f500">{{ formattedPrice(data.price) }} ₽</article>
                    </div>
                </section>
                <div class="nc-modal-form fc">
                    <span class="f500 accent-dark">Оставьте заявку</span>
                    <input type="text" class="i-text-light mt32 i240" placeholder="Ваше имя" v-model="user.name">
                    <input type="text" class="i-text-light mt8 i240" placeholder="Номер телефона" v-model="user.phone">
                    <button class="accent-btn btn180 off-btn mt16 asc" @click="submitForm">Оставить заявку</button>
                </div>
            </div>
        </template>
    </Modal>
</template>
<script>
import contact from '~/config/contacts.js'
import Items from '~/components/universal/Items.vue'

import { ref } from 'vue'
import Modal from '../modals/Modal.vue'

import { isStringLengthBetween } from '~/assets/validators/simple'
import { useRuntimeConfig } from '#app';


export default {
    props: {
        data: {
            required: false,
        }
    },
    data() {
        return {
            features: [
                { key: 'area_house', icon: 'carbon:floorplan', ru: 'Площадь дома' },
                { key: 'area_land', icon: 'carbon:area', ru: 'Площадь участка' },
                { key: 'land_type', icon: 'carbon:document', ru: 'Категория земель' },
                { key: 'floors_count', icon: 'carbon:home', ru: 'Количество этажей' },
                { key: 'year', icon: 'famicons:timer-outline', ru: 'Год постройки' },
                { key: 'electricity', icon: 'carbon:cloud-lightning', ru: 'Электричество' },
                { key: 'water', icon: 'ion:water-outline', ru: 'Вода' },
            ],
            contacts: contact,
            selectedImg: this.data.carousel_images && this.data.carousel_images.length > 0
            ? this.data.carousel_images[0].image_url
            : this.data.main_img_url,
            showModal: ref(false),
            modalData: ref(null),
            user: {
              name: '',
              phone: ''
            }
        }
    },
    methods: {
        formattedPrice(num) {
          if (!num && num !== 0) return ''
          return new Intl.NumberFormat('ru-RU').format(num)
        },
        selectImage(img) {
          this.selectedImg = img.image_url
        },
        openModal(data) {
          this.modalData = data
          this.showModal = true
        },
        closeModal() {
          this.showModal = false
          this.modalData = null
        },
        async submitForm() {
          // Валидация
          if (!isStringLengthBetween(this.user.name, 2, 30)) {
            alert('Поле "Имя" должно содержать от 2 до 30 символов')
            return
          }
          if (!isStringLengthBetween(this.user.phone, 6, 20)) {
            alert('Поле "Телефон" должно содержать от 6 до 20 символов')
            return
          }

          try {
            const config = useRuntimeConfig()


            const response = await fetch(config.public.botApiUrl, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${config.public.botApiToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: this.user.name,
                phone: this.user.phone
              })
            })

            if (!response.ok) {
              throw new Error('Ошибка сети или сервера')
            }

            alert(`Спасибо, ${this.user.name}! Ваша заявка принята.`)
            this.showModal = false
            this.modalData = null
            this.user.name = ''
            this.user.phone = ''
          } catch (error) {
            console.error(error)
            alert('Произошла ошибка при отправке заявки.')
          }
        }

    },
    components: {
        Items,
        Modal
    }
}
</script>
<style>
    .carousel-active {
        border: 2px solid orangered;
    }
    .item-main-img-ly {
        width: 800px;
        height: 600px;
        display: flex;
        overflow: hidden;
    }
    .item-main-img-ly > img {
        max-width: 800px;
        max-height: 600px;
        aspect-ratio: 4/3;
    }
    .carousel-cont {
        width: 800px;
        gap: 6px;
        overflow: hidden;
        flex-wrap: wrap;
        margin-top: 12px;
    }
    .carousel-cont > img {
        width: 153px;
        height: 116px;
    }
    .item-ly {
        justify-content: space-between;
    }
    .right-col {
        width: 272px;
    }
    .item-price {
        font-size: 36px;
    }
    .features-list {
        padding: 0;
        margin-top: 24px;
        border-top: 1px solid var(--accent-green-light);
        width: 600px;

    }
    .features-list > li {
        list-style: none;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 8px;
        border-bottom: 1px solid var(--accent-green-light);
    }
    .feature-icon {
        width: 32px;
        height: 32px;
        color: var(--accent-dark);
    }
    .item-map {
        margin-top: 32px;
        overflow: hidden;
    }
    .item-map > iframe, .item-map {
        width: 796px !important;
        height: 595px !important;
    }
    .item-article {
        width: 796px;
    }
    .item-title {
        font-size: 32px;
    }
    @media(max-width:1230px) {
        .item-main-img-ly {
            width: 480px;
            height: 360px;
        }
        .item-main-img-ly > img {
            max-width: 480px;
            max-height: 360px;
        }
        .carousel-cont {
            width: 480px;
        }
        .carousel-cont > img {
            width: 115px;
            height: 86px;
        }
        .features-list {
            width: 480px;
        }
        .item-map > iframe, .item-map {
            width: 472px !important;
            height: 354px !important;
        }
        .item-article {
            width: 480px;
        }
        .item-title {
            font-size: 26px;
        }
        .right-col {
            width: 190px;
        }
        .item-price {
            font-size: 24px;
        }
    }
    @media(min-width:760px) {
        .second-hand {
            display: none;
        }
        .nc-modal-form {
            margin-left: 32px;
        }
    }
    @media(max-width:759px) {
        .right-col {
            display: none !important;
        }
        .second-hand {
            display: flex;
            flex-direction: column;
            order: 4;
        }
        .item-ly {
            flex-direction: column;
        }
        .item-left-col {
            display: flex;
            flex-direction: column;
        }
        .item-main-img-ly {
            order: 1;
        }
        .carousel-cont {
            order: 2;
        }
        .item-title {
            order: 3;
        }
        .features-list {
            order: 5;
        }
        .item-info {
            order: 6;
        }
        .item-map {
            order: 7;
        }
        .item-main-img-ly {
            width: 100%;
            height: inherit;
            aspect-ratio: 1.33;
        }
        .item-main-img-ly > img {
            max-width: 100%;
            max-height: 100%;
        }
        .carousel-cont {
            width: 100%;
            overflow-x: scroll;
            flex-wrap: nowrap;
        }
        .carousel-cont > img {
            width: 86px;
            height: 64px;
        }
        .features-list {
            width: 100%;
        }
        .item-map > iframe, .item-map {
            width: 100% !important;
            height: 280px !important;
        }
        .item-article {
            width: 100%;
        }
        .item-title {
            font-size: 21px;
            font-weight: 500;
            margin-top: 16px;
            margin-bottom: 8px;
        }
        .right-col {
            width: 190px;
        }
        .item-price {
            font-size: 21px;
        }
        .second-hand-btns-cont {
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .sh-ask, .sh-phone {
            flex: 0 100%;
        }
        .sh-tg, .sh-wa {
            flex: 0 47%;
            font-size: 14px;
        }
        .features-list > li {
            font-size: 16px;
        }
        .feature-icon {
            width: 24px;
            height: 24px;
        }
        .item-article {
            font-size: 14px;
        }
    }
</style>