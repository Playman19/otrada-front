<template>
  <section class="visitka-dark">
    <section class="visitka-dark-container cont-ly flexadapt sb">
      <NuxtLink to="/" class="vd-img-cont">
        <img
          src="/assets/logos/logotext-dark.webp"
          alt="Логотип с текстом коттеджного посёлка Отрада"
        />
      </NuxtLink>
      <section class="flexadapt vd-contacts">
        <nav class="fc">
          <NuxtLink
            :to="contacts.phone1.link"
            class="hover-accent-blue-lightest all2s flex aic fs21-16 white"
            :aria-label="contacts.phone1.aria"
          >
            <aside class="bgimg icon-min phone-white-icon"></aside>
            <span class="ml4">{{ contacts.phone1.inner_html }}</span>
          </NuxtLink>
          <NuxtLink
            :to="contacts.whatsapp.link"
            class="hover-accent-blue-lightest all2s flex aic fs21-16 white"
            :aria-label="contacts.whatsapp.aria"
          >
            <aside class="bgimg icon-min wa-white-icon"></aside>
            <span class="ml4">{{ contacts.whatsapp.inner_html }}</span>
          </NuxtLink>
        </nav>
        <nav class="fc">
          <NuxtLink
            :to="contacts.telegram.link"
            class="hover-accent-blue-lightest all2s flex aic fs21-16 white"
            :aria-label="contacts.telegram.aria"
          >
            <aside class="bgimg icon-min tg-white-icon"></aside>
            <span class="ml4">{{ contacts.telegram.inner_html }}</span>
          </NuxtLink>
          <NuxtLink
            :to="contacts.location.link"
            class="hover-accent-blue-lightest all2s flex aic fs21-16 white"
            :aria-label="contacts.location.aria"
          >
            <aside class="bgimg icon-min location-white-icon"></aside>
            <span class="ml4">{{ contacts.location.inner_html }}</span>
          </NuxtLink>
        </nav>
      </section>
    </section>
  </section>
</template>

<script setup>
import contacts from '~/config/contacts.js'
</script>

<style>
.visitka-dark {
    background-color: var(--accent);
}
@media(min-width:1200px) {
    .visitka-dark {
        padding: 32px 0;
    }
    .vd-contacts {
        gap: 40px;
    }
    .vd-contacts > nav > a {
        margin-bottom: 16px;
    }
}
@media(min-width:760px) and (max-width:1199px) {
    .visitka-dark {
        padding: 26px 0;
    }
    .vd-contacts {
        flex-direction: column;
    }
    .vd-contacts > nav > a {
        margin-bottom: 10px;
    }
    .vd-img-cont > img {
        width: 320px;
    }
}
@media(max-width:759px) {
    .visitka-dark {
        padding: 24px 0;
    }
    .vd-contacts > nav > a {
        margin-bottom: 8px;
    }
    .vd-img-cont {
        margin-bottom: 21px;
    }
    .vd-img-cont > img {
        width: 320px;
    }
    .vd-contacts {
      display: none;
    }
}
</style>
