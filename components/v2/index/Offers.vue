<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import Modal from '~/components/modals/Modal.vue'
import { isStringLengthBetween } from '~/assets/validators/simple'
import { useRuntimeConfig } from '#app'


const offers = [
  {
    title: 'Коттеджный посёлок Отрада',
    items: 'Дома в Отрадном',
    commerce: 'Дома от 65 000 р/м2',
    imgpath: '/assets/v2/desktop/offers/5-1.webp',
    info: 'Закрытый коттеджный поселок в 20 км от Брянска. Комфортабельные дома на просторных участках с развитой инфраструктурой — идеальный выбор для тех, кто ценит спокойствие и природу.'
  },
  {
    title: 'Село Толмачево',
    items: 'Дома в Толмачево',
    commerce: 'Дома от 60 000 р/м2',
    imgpath: '/assets/v2/desktop/offers/5-2.webp',
    info: 'Строительство качественных домов в селе Толмачево с индивидуальным подходом к каждому проекту. Надежные материалы и современные технологии обеспечивают тепло и уют на долгие годы.'
  },
  {
    title: 'Деревня Тиганово',
    items: 'Дома в Тиганово',
    commerce: 'Дома от 55 000 р/м2',
    imgpath: '/assets/v2/desktop/offers/5-4.webp',
    info: 'Строительство качественных домов в селе Тиганово с индивидуальным подходом к каждому проекту. Надежные материалы и современные технологии обеспечивают тепло и уют на долгие годы.'
  },
  {
    title: 'Строительство домов под заказ',
    items: 'Строительство под заказ',
    commerce: 'Цена договорная',
    imgpath: '/assets/v2/desktop/offers/5-3.webp',
    info: 'Индивидуальное строительство под ключ с возможностью выбора дизайна и планировки. Профессиональные строители воплотят в жизнь мечту о доме, идеально соответствующем Вашим потребностям и стилю жизни.'
  }
]

const activeIndex = ref(0)
let intervalId = null

function next() {
  activeIndex.value = (activeIndex.value + 1) % offers.length
}

function prev() {
  activeIndex.value = (activeIndex.value - 1 + offers.length) % offers.length
}

onMounted(() => {
  intervalId = setInterval(() => {
    next()
  }, 6000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

const showModal = ref(false)

function closeModal() {
    showModal.value = false
}

function openModal(offer) {
    modalData.value = offer
    showModal.value = true
}

const modalData = ref(offers[0])

const userData = reactive({
    name: '',
    phone: '',
})

const config = useRuntimeConfig()

const submitForm = async () => {
    console.log(modalData)
    // Проверяем длину name, например от 2 до 30 символов
  if (!isStringLengthBetween(userData.name, 2, 30)) {
    alert('Поле "Имя" должно содержать от 2 до 30 символов')
    return
  }
  if (!isStringLengthBetween(userData.phone, 6, 20)) {
    alert('Поле "Телефон" должно содержать от 6 до 20 символов')
    return
  }
  try {
    await $fetch(config.public.botApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.public.botApiToken}`,
        Accept: 'application/json'
      },
      body: {
        name: userData.name,
        phone: userData.phone,
        comment: modalData.value.title
      }
    })
    alert(`Спасибо, ${userData.name}! Ваша заявка принята.`)
    userData.name = ''
    userData.phone = ''
    closeModal()
  } catch (error) {
    console.error('Ошибка отправки заявки:', error)
  }
}
</script>

<template>
    <h2 class="caps headers f400 tc mt42" id="offers">НАШИ УСЛУГИ</h2>
    <div class="cont-ly fcc relative slider-ly">
        <section class="slider" aria-label="Слайдер предложений">
          <div
            v-for="(offer, index) in offers"
            :key="index"
            class="slide relative"
            :class="{ active: index === activeIndex }"
          >
                <span class="white fs21-16">{{ offer.items }}</span>
                <img :src="offer.imgpath" :alt="offer.title" />
                <section>
                    <h3 class="f600 fs24-16">{{ offer.title }}</h3>
                    <article class="f400 ">{{ offer.info }}</article>
                    <div class="flex offers-cta aic">
                        <p class="m0 fs18-14">{{ offer.commerce }}</p>
                        <button class="accent-gradient-btn" @click="openModal(offer)">Оставить заявку</button>
                    </div>
                </section>
          </div>
        </section>
        <button class="off-btn os-left" @click="prev">
            <Icon name="teenyicons:left-outline" class="s24 accent" />
        </button>
        <button class="off-btn os-right" @click="next">
            <Icon name="teenyicons:right-outline" class="s24 accent" />
        </button>
    </div>
    <Modal :show="showModal" :data="modalData" @close="closeModal">
        <template #default="data">
            <div class="offers-modal">
                <img :src="data.data.imgpath" />
                <div>
                    <h3 class="mt0">Оставьте заявку</h3>
                    <input type="text" class="i-text-2 fs18-14" v-model="userData.name" placeholder="Ваше имя">
                    <input type="text" class="i-text-2 fs18-14 mt12" v-model="userData.phone" placeholder="Номер телефона">
                    <button class="accent-gradient-btn mt24" @click="submitForm">Оставить заявку</button>
                </div>
            </div>
        </template>
    </Modal>
</template>

<style scoped>
.slider {
  position: relative;
  text-align: center;
  overflow: hidden;
}
.slide > section > article {
    text-align: start;
}
@media(min-width:760px) {
    .slider {
        width: 990px;
        height: 340px;
    }
    .slide {
        display: flex;
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 27px;
        overflow: hidden;
    }
    .slide > span {
        position: absolute;
        bottom: 21px;
        left: 21px;
    }
    .slide > section > article {
        font-size: 20px;
    }
    .slide > img {
        width: 432px;
        border-radius: 27px;
    }
    .slide > section {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-left: 24px;
    }
    .offers-cta {
        margin-top: 44px;
        justify-content: space-between;
        width: 100%;
    }
    .offers-cta > button {
        margin-right: 26px;
        padding: 8px 24px !important;
        border-radius: 32px;
    }
    .slider-ly > button {
        position: absolute;
    }
    .os-left {
        left: 0;
    }
    .os-right {
        right: 0;
    }
    .os-left,.os-right {
        top: 124px;
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
@media(max-width:759px) {
    .slider {
        width: 100%;
    }
    .slide {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: white;
        border-radius: 16px;
        overflow: hidden;
    }
    .slide > span {
        position: absolute;
        top: 21px;
        right: 21px;
        text-shadow: 0 1px 4px black;

    }
    .slide > img {
        width: 100%;
        border-radius: 16px;
        box-shadow: 0px 3px 6px 3px #0000003B;
    }
    .slide > section {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: start;
        margin-left: 24px;
    }
    .offers-cta {
        margin-top: 21px;
        justify-content: space-between;
        flex-direction: column;
        align-items: start;
        width: 100%;
        margin-bottom: 16px;
    }
    .offers-cta > button {
        margin-right: 26px;
        padding: 8px 24px !important;
        border-radius: 32px;
        align-self: end;
    }
    .slider-ly > button {
        position: absolute;
    }
    .os-left {
        left: 0;
    }
    .os-right {
        right: 0;
    }
    .os-left,.os-right {
        top: 124px;
    }

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
}
.slide {
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  opacity: 0;
  transition: left 0.5s ease, opacity 0.5s ease;
  pointer-events: none;
  user-select: none;
}

.slide.active {
  left: 0;
  opacity: 1;
  pointer-events: auto;
  user-select: auto;
  position: relative;
}
</style>