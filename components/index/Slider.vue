<template>
  <header class="slider1 slider1-blur">
    <div class="slider1_bg1"></div>

    <section class="flex sb aic cont-ly banner1-header">
      <NuxtLink
        to="/"
        class="flex aic banner-1-top-logo-container"
        aria-label="Перейти на главную страницу сайта коттеджного посёлка Отрада"
      >
        <img
          src="/assets/logos/logo-dark.webp"
          class="slide-logo"
          alt="Логотип коттеджного посёлка Отрада"
        />
        <h1 class="none">Коттеджный посёлок Отрада</h1>
        <h2 class="white hover-accent-blue-lightest all2s">КП Отрада</h2>
      </NuxtLink>

      <nav class="fc">
        <a
          :href="contacts.phone1.link"
          class="hover-accent-blue-lightest all2s flex aic fs21-16 bold white"
          :aria-label="contacts.phone1.aria"
        >
          <aside class="bgimg icon-min phone-white-icon"></aside>
          <span class="ml4">{{ contacts.phone1.inner_html }}</span>
        </a>
        <a
          :href="contacts.phone2.link"
          class="hover-accent-blue-lightest all2s flex aic fs21-16 bold white mt0-6em"
          :aria-label="contacts.phone2.aria"
        >
          <aside class="bgimg icon-min phone-white-icon"></aside>
          <span class="ml4">{{ contacts.phone2.inner_html }}</span>
        </a>
      </nav>
    </section>

    <section class="flex slider1-logo-container mt24">
      <aside class="logo-for-banner-lines-left"></aside>
      <img
        src="/assets/logos/logo-light-with-border.webp"
        alt="Логотип коттеджного посёлка Отрада для баннера"
        class="slider1-logo-for-banner"
      />
      <aside class="logo-for-banner-lines-right"></aside>
    </section>

    <section class="cont-ly banner-1-content">
      <section class="banner-1-offer">
        <h2 class="white f500 m0">Частный дом</h2>
        <article class="alternate-light bold caps">
          Частные дома по специальной цене
        </article>
        <a class="alternate-btn btn180 block tc" href="#cases">Смотреть проекты</a>
      </section>

      <section class="banner1-form-container">
        <h2 class="m0 white f500 caps">Купить дом</h2>
        <form @submit.prevent="submitForm" class="fc">
          <input type="hidden" name="send" />

          <input
            v-model="form.name"
            class="i-text mt1em"
            type="text"
            name="name"
            placeholder="Ваше Имя"
            minlength="3"
            maxlength="40"
            required
          />

          <input
            v-model="form.phone"
            class="i-text mt1em"
            type="tel"
            name="phone"
            id="phone"
            placeholder="Номер телефона"
            minlength="6"
            maxlength="18"
            required
          />

          <button class="accent-btn btn160 off-btn mt1em" type="submit">
            Оставить заявку
          </button>
        </form>

        <article class="mt1em">
          Нажимая
          <span class="f500 accent-dark">Оставить заявку</span> вы соглашаетесь
          с
          <NuxtLink
            to="/"
            class="f500 alternate hover-alternate-light all2s"
          >
            Политикой конфидециальности
          </NuxtLink>
        </article>
      </section>
    </section>
  </header>
</template>

<script setup>
import { reactive } from 'vue'
import { useRuntimeConfig } from '#app'
import contacts from '~/config/contacts'
import { isStringLengthBetween } from '~/assets/validators/simple'

const form = reactive({
  name: '',
  phone: ''
})

const config = useRuntimeConfig()

const submitForm = async () => {
    // Проверяем длину name, например от 2 до 30 символов
  if (!isStringLengthBetween(form.name, 2, 30)) {
    alert('Поле "Имя" должно содержать от 2 до 30 символов')
    return
  }
  if (!isStringLengthBetween(form.phone, 6, 20)) {
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
        name: form.name,
        phone: form.phone
      }
    })
    alert(`Спасибо, ${form.name}! Ваша заявка принята.`)
    form.name = ''
    form.phone = ''
  } catch (error) {
    console.error('Ошибка отправки заявки:', error)
    alert('Произошла ошибка при отправке заявки.')
  }
}
</script>


<style>
.slider1 {
    position: relative;
    overflow: hidden;
}
.slider1-blur {
    background: linear-gradient(
        to bottom,
        var(--accent) 18%,
        var(--accent) 18%,
        var(--accent-blur) 70%,
        var(--accent-blur) 100%
      );
}
.slider1_bg1 {
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    z-index: -1;
}
.slider1-logo-container {
    margin-inline: auto;
}
.banner1-form-container {
    background-color: #FFFFFF50;
}
@media(min-width:1200px) {
    .slider1 {
        height: 796px;
    }
    .slider1-logo-container {
        width: 82%;
        justify-content: center;
    }
    .slider1-logo-for-banner {
        width: 42%;
    }
    .logo-for-banner-lines-left,.logo-for-banner-lines-right {
        height: 4px;
        border-bottom: 4px solid var(--white);
        width: 420px;
        animation: slider-line linear 1s;
    }
    .logo-for-banner-lines-left {
        margin-right: -32px;
        margin-top: 22px;
    }
    .logo-for-banner-lines-right {
        margin-left: -32px;
        margin-top: 22px;
    }
    .slider1_bg1 {
        background-size: 100vw;
        background-position: center;
    }
    .slide-logo {
        width: 120px;
        height: 120px;
    }
    @keyframes slider-line {
        0% {
            width: 0;
        }
    }
    .banner-1-offer {
        margin-top: 32px;
    }
    .banner-1-offer > h2 {
        font-size: 76px;
    }
    .banner-1-offer > article {
        font-size: 24px;
    }
    .banner-1-offer > a {
        margin-top: 36px;
    }
    .banner1-form-container {
        padding: 26px;
        border-radius: 4px;
        width: 380px;
    }
    .banner1-form-container > form {
        width: 220px;
    }
    .banner1-form-container > article {
        font-size: 12px;
    }
}
@media(min-width:760px) and (max-width:1199px) {
    .slider1 {
        height: 690px;
    }
    .slider1-logo-container {
        width: 82%;
        justify-content: center;
    }
    .slider1-logo-for-banner {
        width: 42%;
    }
    .slider1_bg1 {
        background-position: center;
    }
    .slide-logo {
        width: 120px;
        height: 120px;
    }
    .banner-1-offer {
        margin-top: 28px;
    }
    .banner-1-offer > h2 {
        font-size: 42px;
    }
    .banner-1-offer > article {
        font-size: 24px;
    }
    .banner-1-offer > a {
        margin-top: 36px;
    }
    .banner1-form-container {
        padding: 26px;
        border-radius: 4px;
        width: 380px;
    }
    .banner1-form-container > form {
        width: 220px;
    }
    .banner1-form-container > article {
        font-size: 12px;
    }
}
@media(min-width:760px) {
    .slider1_bg1 {
        background-image: url('/slider/1.webp');
    }
    .banner-1-content {
        display: flex;
        justify-content: space-between;
    }
}
@media(max-width:759px) {
    .banner-1-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: ani-opacity 2s;
    }
    .banner1-header {
        animation: ani-opacity 2s;
    }
    .slider1_bg1 {
        background-image: url('/slider/1-mob.webp');
    }
    .banner-1-top-logo-container {
        padding-top: 6px;
    }
    .banner-1-top-logo-container > h2 {
        font-size: 16px;
    }
    .slider1 {
        height: 560px;
    }
    .slider1-logo-container {
        display: none;
    }
    /* .slider1-logo-for-banner {
        width: 42%;
    } */
    .slider1_bg1 {
        background-position: center;
    }
    .slide-logo {
        width: 64px;
        height: 64px;
    }
    .banner-1-offer {
        margin-top: 28px;
    }
    .banner-1-offer > h2 {
        font-size: 36px;
    }
    .banner-1-offer > article {
        font-size: 12px;
    }
    .banner-1-offer > a {
        margin-top: 21px;
    }
    .banner1-form-container {
        padding: 12px;
        border-radius: 4px;
        margin-top: 52px;
    }
    .banner1-form-container > h2 {
        font-size: 18px;
    }
    .banner1-form-container > form {
        width: 220px;
    }
    .banner1-form-container > article {
        font-size: 12px;
        max-width: 352px;
    }
}
</style>