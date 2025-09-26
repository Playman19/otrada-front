<script setup>
import { Icon } from '#components';
</script>
<template>
    <header class="header-2">
        <section class="cont-ly">
            <NuxtLink to="/" aria-label="Перейти на главную страницу" class="flex aic header-2-goto">
                <Icon name="lucide:move-left" class="s32 white" />
                <span class="fs24-16 ml24 white f500">Главная страница</span>
            </NuxtLink>
        </section>
    </header>
</template>
<style scoped>
    .header-2 {
        background-color: #0A5A5AC7;
        position: relative;
    }
    .header-2::before {
        content: "";
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: var(--bg);
        position: absolute;
        top: 0;
        left: 0;
    }
    @media(min-width:760px) {
        .header-2 {
            padding-top: 42px;
            border-bottom-left-radius: 72px;
            border-bottom-right-radius: 72px;
            padding-bottom: 42px;
        }
    }
    @media(max-width:759px) {
        .header-2 {
            padding-top: 21px;
            border-bottom-left-radius: 14px;
            border-bottom-right-radius: 14px;
            padding-bottom: 21px;
            align-items: center;
        }
    }
</style>