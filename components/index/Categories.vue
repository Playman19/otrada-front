<template>
  <section class="navigate-cards flex cont-ly mt24">
    <div class="slider-wrapper">
      <div
        v-for="(card, idx) in cards"
        :key="idx"
        class="slider-slide"
        :class="{ active: idx === activeIndex }"
        :aria-label="`Перейти к просмотру ${card.title}`"
        v-show="true"
      >
      <div class="categories-info">
          <h3 class="accent-dark hover-accent-green-light f600 fs24">{{ card.title }}</h3>
          <article class="alternate-dark">{{ card.items }}</article>
          <article class="accent-green-light f500">{{ card.commerce }}</article>
          <button class="accent-btn btn180 off-btn mt1-5em modal-mod" @click="openModal(card)">Подробнее</button>
      </div>
      <img :src="card.imgpath" :alt="`${card.title} общее фото`">
      </div>
      <!-- Кнопки переключения -->
      <div class="slider-controls">
        <button
          v-for="(card, idx) in cards"
          :key="'btn-' + idx"
          :class="{ 'active-btn': idx === activeIndex }"
          @click="goToSlide(idx)"
          aria-label="Переключить слайд"
        ></button>
      </div>
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
import Modal from '../modals/Modal.vue';

export default {
  components: { Modal },
  data() {
    return {
      showModal: false,
      modalData: null,
      activeIndex: 0,
      intervalTime: 6000,
      intervalId: null,
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
  mounted() {
    this.startAutoSlide();
  },
  beforeDestroy() {
    this.stopAutoSlide();
  },
  methods: {
    openModal(data) {
      this.modalData = data;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalData = null;
    },
    startAutoSlide() {
      this.intervalId = setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % this.cards.length;
      }, this.intervalTime);
    },
    stopAutoSlide() {
      if (this.intervalId) clearInterval(this.intervalId);
    },
    goToSlide(idx) {
      this.activeIndex = idx;
      this.stopAutoSlide();
      this.startAutoSlide();
    }
  }
}
</script>

<style scoped>
.slider-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}
.slider-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 220px;
  opacity: 0;
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: opacity 0.6s ease;
  transform: translateX(100%);
}
.slider-slide.active {
    opacity: 1;
     pointer-events: auto;
  animation: slideInLeft 0.6s forwards ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 220px;
}
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.slider-slide.active  > img {
  height: 220px;
}
.slider-controls {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    justify-content: center;
}
.slider-controls button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: #ccc;
  cursor: pointer;
  outline: none;
  transition: all .2s ease;
}
.slider-controls button.active-btn {
  background: #2ecc40;
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
    .slider-slide.active  > img {
      height: 92px;
      margin-left: 6px;
      border-radius: 6px;
    }
    .categories-info > article {
        font-size: 12px;
    }
    .categories-info > button {
        display: none;
    }
    .slider-wrapper {
        height: 180px;
    }
    .categories-info > h3 {
        font-size: 16px;
    }
    .navigate-cards {
        margin-top: 0;
    }
}
</style>
