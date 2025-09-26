<script setup>
import { ref } from 'vue'

const faqItems = [
  { question: 'Как купить участок или дом в коттеджном поселке Отрада?', answer: 'В поселке «Отрада» вы можете приобрести как готовый дом, так и участок для строительства по индивидуальному проекту с сопровождением наших специалистов. Оплата возможна как наличными, так и с помощью ипотечного кредитования — мы поможем подобрать лучший вариант' },
  { question: 'Можно ли оформить ипотеку или рассрочку?', answer: 'Мы являемся аккредитованным застройщиком, поэтому предлагаем выгодные условия по всем льготным ипотечным программам. Также доступна рассрочка на 6 месяцев, что делает покупку максимально удобной и доступной.' },
  { question: 'Какие документы оформляются при покупке?', answer: 'Весь пакет документов, включая оценку пригодности жилья к проживанию, мы готовим самостоятельно. От покупателя потребуется только паспорт — мы позаботимся обо всём остальном.' },
  { question: 'Можно ли приехать посмотреть на экскурсию в поселок?', answer: 'Конечно! Мы будем рады организовать для вас персональную экскурсию по поселку. Просим записываться заранее по телефону, чтобы зарезервировать время и подробно познакомить вас с нашей территорией и домами.' },
  { question: 'Какая инфраструктура находится рядом с коттеджным поселком?', answer: 'В шаговой доступности от поселка расположены детский сад, школа, остановки общественного транспорта, супермаркеты «Пятёрочка» и «Магнит», а также пункты выдачи онлайн-магазинов Wildberries и Ozon — все, что необходимо для комфортной и современной жизни.' },
]

const openedIndexes = ref(new Set())

function toggle(index) {
  if (openedIndexes.value.has(index)) {
    openedIndexes.value.delete(index)
  } else {
    openedIndexes.value.add(index)
  }
  // Trigger Vue reactivity on Set update
  openedIndexes.value = new Set(openedIndexes.value)
}
</script>

<template>
  <section class="cont-ly" id="faq">
    <h4 class="caps f400 headers tc">Часто задаваемые вопросы</h4>
    <ul class="faq-list">
      <li v-for="(item, index) in faqItems" :key="index" class="faq-item">
        <div @click="toggle(index)" class="faq-item-hdr">
          <Icon 
            :name="openedIndexes.has(index) ? 'uiw:close' : 'uiw:down'" 
            class="accent" 
          />
          <p class="fs24-16">{{ item.question }}</p>
        </div>
        <article v-show="openedIndexes.has(index)" class="fs18-14">
          {{ item.answer }}
        </article>
      </li>
    </ul>
  </section>
</template>

<style scoped>
    .faq-list {
        border: 1px solid #342D2D;
    }
    .faq-list > li {
        border-bottom: 1px solid #342D2D;
    }
    .faq-list > *:last-child {
        border: none !important;
    }
    .faq-item-hdr {
        cursor: pointer;
        display: flex;
        align-items: center;
        user-select: none;
    }
    @media(min-width:760px) {
        .faq-list {
            border-radius: 27px;
        }
        .faq-list > li {
            padding-left:24px;
        }
        .faq-list > li > p {
            margin-left: 16px;
        }
        .faq-item-hdr > p {
            margin-left: 24px;
        }
        .faq-item > article {
            margin-left: 42px;
            margin-bottom: 12px;
        }
    }
    @media(max-width:759px) {
        .faq-list {
           border-radius: 16px;
        }
        .faq-list > li {
            padding-left:16px;
        }
        .faq-item-hdr > p {
            margin-left: 12px;
        }
        .faq-item > article {
            margin-left: 32px;
            margin-bottom: 8px;
            margin-right: 6px;
        }
    }
</style>
