<template>
    <section class="cont-ly">
        <div class="item-2-1-ly flex-mob-col">
            <div class="item2-imgs-ly">
                <div class="item2-main-img-ly">
                    <img  :src="selectedImg" :alt="`Главное фото ${data.title}`">
                </div>
                <div class="carousel2-cont flex">
                    <img v-for="(img, index) in data.carousel_images"
                        :src="img.image_url"
                        :alt="`Фото ${index} ${data.title}`"
                        :class="{ 'carousel2-active': img.image_url === selectedImg }"
                        @click="selectImage(img)"
                    >
                </div>
            </div>
            <div class="houses-right-col flex">
                <h1 class="f600">{{ data.title }}</h1>
                <p>{{ formattedPrice(data.price) }} ₽</p>
                <span class="item-location grey">{{ data.location }}</span>
                <span class="f500 dark-font">{{ data.address }}</span>
                <nav class="house-ask-btns">
                    <button :aria-label="`Оставить заявку на ${data.title}`" @click="openModal(data)" class="accent-gradient-btn">Оставить заявку</button>
                    <NuxtLink class="accent-gradient-btn house-ask-btns-small  mobile-fix-contact" :to="contacts.phone1.link" :aria-label="contacts.phone1.aria">
                      <Icon name="mynaui:telephone" />
                    </NuxtLink>
                    <NuxtLink class="accent-gradient-btn house-ask-btns-large" :to="contacts.phone1.link" :aria-label="contacts.vk.aria">
                      <Icon name="basil:vk-outline" />
                    </NuxtLink>
                    <NuxtLink class="accent-gradient-btn house-ask-btns-large" :to="contacts.telegram.link" :aria-label="contacts.telegram.aria">
                      <Icon name="basil:telegram-outline" />
                    </NuxtLink>
                    <NuxtLink class="accent-gradient-btn house-ask-btns-small" :to="contacts.whatsapp.link" :aria-label="contacts.whatsapp.aria">
                      <Icon name="ic:outline-whatsapp" />
                    </NuxtLink>
                </nav>
            </div>
        </div>
    </section>
    <section class="cont-ly mt24">
      <h2 class="f600 fs24-18">Харктеристики</h2>
      <ul class="house-features-ly">
        <li v-for="feature in features" class="flex">
          <div class="houses-features-icon">
            <Icon :name="feature.icon" />
          </div>
          <section class="fc ml16 features-content">
            <span class="fs21-14">{{ feature.ru }}:</span>
            <span class="fs21-14">{{ data[feature.key] }}</span>
          </section>
        </li>
      </ul>
    </section>
    <section class="cont-ly fc">
      <h3 class="none">Описание</h3>
      <article class="fs18-14 houses-art">
        {{ data.description }}
      </article>
      <div v-if="data.map !== '-'" v-html="data.map" class="item-map"></div>
    </section>
    <teleport to="body">
      <Modal :show="showModal" :data="modalData" @close="closeModal">
        <template #default="{ data }">
          <div>
            <div class="offers-modal">
                <img :src="data.main_img_url" />
                <div>
                    <h3 class="mt0">Оставьте заявку</h3>
                    <input type="text" class="i-text-2 fs18-14" v-model="user.name" placeholder="Ваше имя">
                    <input type="text" class="i-text-2 fs18-14 mt12" v-model="user.phone" placeholder="Номер телефона">
                    <button class="accent-gradient-btn mt24" @click="submitForm">Оставить заявку</button>
                </div>
            </div>
          </div>
        </template>
      </Modal>
    </teleport>
</template>

<script>
import contact from '~/config/contacts.js'
import Items from '~/components/universal/Items.vue'

import { ref } from 'vue'
import Modal from '~/components/modals/Modal.vue'

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
                { key: 'floors_count', icon: 'ph:house-line', ru: 'Количество этажей' },
                { key: 'area_land', icon: 'clarity:resize-line', ru: 'Площадь участка' },
                { key: 'year', icon: 'radix-icons:timer', ru: 'Год постройки' },
                { key: 'land_type', icon: 'system-uicons:document', ru: 'Категория земель' },
                { key: 'electricity', icon: 'mage:electricity', ru: 'Электричество' },
                { key: 'water', icon: 'famicons:water-outline', ru: 'Вода' },
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
                phone: this.user.phone,
                comment: this.data.title,
                page: window.location.href
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

<style scoped>
    .item2-main-img-ly {
        display: flex;
        width: 100%;
        overflow: hidden;
        aspect-ratio: 4/3;
      }
      .houses-right-col {
        flex-direction: column;
      }
      .house-ask-btns {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .house-ask-btns > button {
        flex: 0 100%;
      }
      .house-ask-btns-small, .house-ask-btns-large {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 0.3em;
      } 
      .house-ask-btns-small {
        flex: 0 32%;
      }
      .house-ask-btns-large {
        flex: 0 65%;
      }
      .houses-features-icon {
        background-color: var(--accent);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .houses-features-icon > span {
        color: white;
      }
      .house-features-ly {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
      }
      .house-features-ly > li {
        flex: 0 46%;
      }
    @media(min-width:1100px) {
        .item2-imgs-ly, .item2-main-img-ly > img, .carousel2-cont {
            width: 520px;
        }
        .item2-imgs-ly {
            overflow: hidden;
        }
        .item2-main-img-ly > img {
            border-radius: 27px;
        }
        .carousel2-cont {
            margin-top: 10px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }
        .carousel2-cont > img {
            width: 164px;
            height: 106px;
            margin-left: 8px;
            margin-bottom: 8px;
            border-radius: 16px;
        }
        .item-2-1-ly {
            padding-top: 56px;
            display: flex;
            justify-content: space-between;
        }
        
    }
    @media(min-width:760px) {
      .houses-right-col {
        align-items: end;
      }
      .house-ask-btns-small > span, .house-ask-btns-large > span {
        width: 32px;
        height: 32px;
      }
      .house-ask-btns > button {
        font-size: 21px;
        padding: 10px 0;
        border-radius: 26px;
      }
      .house-ask-btns-small, .house-ask-btns-large {
        padding: 6px 0;
        border-radius: 24px;
      }
      .houses-right-col > h1 {
        font-size: 36px;
        margin: 0;
      }
      .houses-right-col > p {
        font-size: 32px;
        margin: 0;
      }
      .house-ask-btns {
        width: 232px;
        margin-top: 12px;
      }
      .houses-features-icon {
        padding: 10px;
        border-radius: 16px;
      }
      .houses-features-icon > span {
        width: 42px;
        height: 42px;
      }
      .house-features-ly > li {
        margin-bottom: 12px;
      }
      .house-features-ly {
        width: 750px;
      }
      .houses-art {
        max-width: 820px;
      }
      .item-map {
        overflow: hidden;
        border-radius: 23px;
        padding-bottom: 100px;
      }

      .offers-modal {
        width: 720px;
        padding: 18px;
        display: flex;
        justify-content: space-between;
       }
       .offers-modal > img {
           width: 360px;
           border-radius: 16px;
       }
       .offers-modal > div {
           display: flex;
           flex-direction: column;
           flex-grow: 1;
           margin-left: 24px;
           margin-right: 32px;
       }
       .offers-modal > div > button {
           padding: 12px 0;
           border-radius: 24px;
       }
    }
    @media(min-width:760px) and (max-width:1099px) {
      .item2-imgs-ly, .item2-main-img-ly > img, .carousel2-cont {
            width: 300px;
        }
        .item2-imgs-ly {
            overflow: hidden;
        }
        .item2-main-img-ly > img {
            border-radius: 12px;
        }
        .carousel2-cont {
            margin-top: 8px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }
        .carousel2-cont > img {
            width: 92px;
            height: 66px;
            margin-left: 8px;
            margin-bottom: 8px;
            border-radius: 12px;
        }
        .item-2-1-ly {
            padding-top: 56px;
            display: flex;
            justify-content: space-between;
        }
    }
    @media(max-width:759px) {
      .offers-modal {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .offers-modal > img {
          width: 120px;
          height: 90px;
          border-radius: 8px;
      }
      .offers-modal > div {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          margin-left: 12px;
          margin-right: 12px;
      }
      .offers-modal > div > button {
          padding: 12px 0;
          border-radius: 12px;
      }
      .item2-imgs-ly, .item2-main-img-ly > img, .carousel2-cont {
            width: 100%;
        }
        .item2-imgs-ly {
            overflow-x: scroll;
        }
        .item2-main-img-ly > img {
            border-radius: 12px;
        }
        .carousel2-cont {
            margin-top: 10px;
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
        }
        .carousel2-cont > img {
            width: 100px;
            height: 75px;
            margin-left: 8px;
            margin-bottom: 8px;
            border-radius: 8px;
        }
        .item-2-1-ly {
            padding-top: 56px;
            display: flex;
            justify-content: space-between;
        }
      .house-ask-btns-small > span, .house-ask-btns-large > span {
        width: 16px;
        height: 16px;
      }
      .house-ask-btns > button {
        font-size: 16px;
        padding: 6px 0;
        border-radius: 26px;
      }
      .house-ask-btns-small, .house-ask-btns-large {
        padding: 6px 0;
        border-radius: 24px;
      }
      .houses-right-col > h1 {
        font-size: 21px;
        font-weight: 500 !important;
        margin: 0;
      }
      .houses-right-col > p {
        font-size: 18px;
        margin: 0;
      }
      .houses-right-col > span {
        font-size: 14px;
      }
      .house-ask-btns {
        width: 100%;
        margin-top: 12px;
        align-items: center;
      }
      .mobile-fix-contact {
        margin-top: 0 !important;
      }
      .house-ask-btns > button {
        flex: 0 74%;
      }
      .house-ask-btns-small {
        flex: 0 24%;
      }
      .house-ask-btns-large {
        flex: 0 36%;
      }
      .houses-features-icon {
        padding: 4px;
        border-radius: 8px;
        margin-top: 4px;
      }
      .houses-features-icon > span {
        width: 18px;
        height: 18px;
      }
      .house-features-ly > li {
        margin-bottom: 8px;
        align-items: start;
      }
      .features-content {
        margin-left: 6px !important;
      }
      .houses-art {
        max-width: 820px;
      }
      .item-map {
        overflow: hidden;
        border-radius: 12px;
        padding-bottom: 80px;
      }
    }
</style>