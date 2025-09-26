<script setup>
import contacts from '~/config/contacts'
import { ref } from 'vue'

const mobileModeSet = ref(false)

function openMenu() {
    mobileModeSet.value = true
}


const jakors = [
    { anchor: 'О поселке', link: '#about' },
    { anchor: 'Наши услуги', link: '#offers' },
    { anchor: 'Доступные предложения', link: '#items' },
    { anchor: 'Частые вопросы', link: '#faq' },
]

function gotoFaq() {
    window.location.href='/#faq'
}

</script>

<template>
    <header class="relative">
        <div class="utp-bg" :class="mobileModeSet ? 'utp-bg-opened' : 'utp-bg-closed'">
            <section class="cont-ly">
                <section class="flex sb aic utp-hdr mobile-none">
                    <NuxtLink
                      to="/"
                      class="flex aic utp-top-logo-container"
                      aria-label="Перейти на главную страницу сайта коттеджного посёлка Отрада"
                    >
                      <img
                        src="/assets/v2/logo-v2.png"
                        alt="Логотип коттеджного посёлка Отрада"
                      />
                      <h1 class="none">Коттеджный посёлок Отрада</h1>
                      <h2 class="white hover-accent-blue-lightest all2s none">КП Отрада</h2>
                    </NuxtLink>
                    <nav class="utp-jakors">
                        <a v-for="jakor in jakors" :href="jakor.link" class="white ml12">{{ jakor.anchor }}</a>
                    </nav>
                    <nav class="utp-phones">
                        <a
                          :href="contacts.phone1.link"
                          class="hover-accent-blue-lightest all2s flex aic fs21-16 white"
                          :aria-label="contacts.phone1.aria"
                        >
                          <span>{{ contacts.phone1.inner_html }}</span>
                        </a>
                        <a
                          :href="contacts.phone2.link"
                          class="hover-accent-blue-lightest all2s flex aic fs21-16 white"
                          :aria-label="contacts.phone2.aria"
                        >
                          <span>{{ contacts.phone2.inner_html }}</span>
                        </a>
                    </nav>
                </section>
                <section class="flex sb aic utp-hdr desktop-none relative" >
                    <NuxtLink
                      to="/"
                      class="flex aic utp-top-logo-container"
                      aria-label="Перейти на главную страницу сайта коттеджного посёлка Отрада"
                      v-if="!mobileModeSet"
                    >
                      <img
                        src="/assets/v2/logo-v2.png"
                        alt="Логотип коттеджного посёлка Отрада"
                      />
                    </NuxtLink>
                    <nav class="utp-jakors" v-if="mobileModeSet">
                        <a v-for="jakor in jakors" :href="jakor.link" class="white ml12">{{ jakor.anchor }}</a>
                    </nav>
                    <nav class="utp-phones" v-if="!mobileModeSet">
                        <a
                          :href="contacts.phone1.link"
                          class="hover-accent-blue-lightest all2s flex aic fs21-16 white"
                          :aria-label="contacts.phone1.aria"
                        >
                          <span>{{ contacts.phone1.inner_html }}</span>
                        </a>
                        <a
                          :href="contacts.phone2.link"
                          class="hover-accent-blue-lightest all2s flex aic fs21-16 white"
                          :aria-label="contacts.phone2.aria"
                        >
                          <span>{{ contacts.phone2.inner_html }}</span>
                        </a>
                    </nav>
                    <button class="off-btn open-burger" @click="openMenu" v-if="!mobileModeSet">
                        <Icon name="iconamoon:menu-burger-horizontal" class="white" />
                    </button>
                </section>
                <section class="fc utp-cta ais">
                    <section>
                        <img src="/assets/v2/desktop/utp/2.png" class="utp-img" />
                        <article class="white">Комфортная загородная жизнь рядом с Брянском</article>
                    </section>
                    <button class="accent-gradient-btn fs21-16 utp-uznat-bolsche" @click="gotoFaq">Узнать больше</button>
                </section>
            </section>
        </div>
        <aside class="shtora"></aside>
    </header>
</template>

<style scoped>
.utp-bg {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
}
.utp-jakors, .utp-top-logo-container > img, .utp-phones, .utp-cta, .open-burger {
    z-index: 3;
}
.utp-cta {
    position: relative;
}

@media(min-width:760px) {
    .utp-bg {
        background-image: url('/assets/v2/desktop/utp/1.webp');
        height: 910px;
    }
    .utp-top-logo-container > img {
        width: 228px;
        height: 55px;
    }
    .utp-hdr {
        padding-top: 28px;
    }
    .utp-jakors {
        padding: 16px 24px;
        border-radius: 24px;
    }
    .utp-bg::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 400px;
        background: linear-gradient(to bottom, rgba(0,0,0,0.68), rgba(0,0,0,0));
        pointer-events: none;
        z-index: 1;
    }
    .utp-cta {
        padding: 32px 16px;
        width: 700px;
        margin-top: 324px;
        border-radius: 26px;
    }
    .utp-cta > section {
        padding-left: 12px;
        border-left: 10px solid var(--accent);
    }
    .utp-uznat-bolsche {
        padding: 14px 18px;
        border-radius: 26px;
        margin-top: 24px;
    }
    .shtora {
        height: 160px;
        width: 100%;
        background-image: url('/assets/v2/desktop/utp/3.png');
        position: absolute;
        bottom: -27px;
        left: 0;
    }
}
@media(max-width:512px) {
    .utp-bg {
        background-image: url('/assets/v2/mobile/utp/1.webp');
        height: 240px;
    }
}
@media(min-width:513px) and (max-width:759px) {
    .utp-bg {
        background-image: url('/assets/v2/desktop/utp/1.webp');
        height: 360px;
    }
}
@media(min-width:760px) {
    .utp-cta::after {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: -1;
        border-radius: 38px;
    }
    .utp-jakors {
        background-color: #D9D9D980;
        border: 1px solid #D9D9D9;
        z-index: 3;
    }
}
@media(max-width:759px) {
    .utp-bg-closed::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 120px;
        background: linear-gradient(to bottom, #00000080, transparent);
        pointer-events: none;
        z-index: 1;
    }
    .utp-bg-opened::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 180px;
        background: linear-gradient(to bottom, #0a5a5a, transparent);
        pointer-events: none;
        z-index: 1;
    }
    .utp-cta::after {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: -1;
        border-radius: 12px;
    }
    .utp-img {
        width: 80%;
    }
    .utp-cta {
        margin-top: 62px;
        padding: 8px;
    }
    .utp-jakors  {
        font-size: 9px;
        font-weight: 500;
        margin-top: 8px;
    }
    .shtora {
        height: 40px;
        width: 100%;
        background-image: url('/assets/v2/desktop/utp/3.png');
        background-size: cover;
        position: absolute;
        bottom: -27px;
        left: 0;
    }
    .utp-cta > section > article {
        font-size: 12px;
    }
    .utp-uznat-bolsche {
        padding: 4px 6px;
        margin-top: 10px;
    }
    .utp-hdr {
        padding-top: 8px;
    }
    .utp-top-logo-container > img {
        width: 100px;
        height: 26px;
    }
    .open-burger {
        position: absolute;
        right: 0;
        top: 16px;
    }
    .utp-phones {
        margin-right: 36px;
    }
    .open-burger > span {
        font-size: 24px;
    }
}
</style>