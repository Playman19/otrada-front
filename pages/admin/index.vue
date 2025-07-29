<template>
    <div class="visitka-dark">
        <section class="visitka-dark-container cont-ly flexadapt sb">
            <NuxtLink to="/" class="vd-img-cont">
              <img
                src="/assets/logos/logotext-dark.webp"
                alt="Логотип с текстом коттеджного посёлка Отрада"
                class="i180"
              />
            </NuxtLink>
            <div class="flex aic">
                <Icon name="eos-icons:admin-outlined" class="white s32" />
                <span class="fs18 f600 alternate-light ml6">Панель администратора</span>
            </div>
        </section>
    </div>
    <div class="admin-ly">
        <aside class="admin-blur"></aside>
        <HousesList v-if="mode === 'list'" />
        <HouseData v-if="mode === 'add'" @set-mode-list-emit="setModeList"/>
        <div class="admin-navigate-btns" >
            <button @click="mode = 'list'" :class="{'admin-navigation-active-btns': mode === 'list'}">
                <Icon name="gg:list" class="s24 white" />
                <span class="white ml4">Список домов</span>
            </button>
            <button @click="mode = 'add'" class="mt6" :class="{'admin-navigation-active-btns': mode === 'add'}">
                <Icon name="lucide:house-plus" class="s24 white" />
                <span class="white ml4">Добавить дом</span>
            </button>
            <button class="mt6" @click="logout">
                <Icon name="material-symbols:logout" class="s24 white" />
                <span class="white ml4">Выйти</span>
            </button>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
      middleware: 'check-auth'
    })
</script>
<script>
import HousesList from '~/components/admin/HousesList.vue'
import HouseData from '~/components/admin/HouseData.vue'
import { useAuth } from '~/composables/auth.js'

export default {
    components: {
        HousesList,
        HouseData
    },
    data() {
        return {
            mode: 'list'
        }
    },
    methods: {
        async logout() {
          const auth = useAuth()
          try {
            await auth.logoutReq()
            window.location.href = '/'
          } catch (error) {
            console.error('Ошибка при выходе:', error)
            auth.clearToken()
            window.location.href = '/'
          }
        },
        setModeList() {
            this.mode = 'list'
        }
    }

}
</script>
<style>
    .admin-ly {
        background-image: url('../../assets/admin-bg.webp');
        background-size: cover;
        background-position: center;
        position: relative;
        background-repeat: no-repeat;
        min-height: 900px;
        border-top: 1px solid var(--white);
    }
    .admin-navigate-btns {
        position: absolute;
        top: 16px;
        left: 36px;
        display: flex;
        flex-direction: column;
    }
    .admin-navigate-btns > button {
        border: 3px solid var(--white);
        background-color: transparent;
        padding: 8px 12px;
        display: flex;
        align-items: center;
    }
    .admin-navigation-active-btns {
        border: 3px solid orangered !important;

    }

</style>