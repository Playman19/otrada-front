<script setup>
import Modal from '~/components/modals/Modal.vue';
import contacts from '~/config/contacts';
import { ref, reactive } from 'vue';
import { useAuth } from '#imports';

const loginData = reactive({
    login: '',
    password: ''
})

const showModal = ref(false)

function openModal() {
    showModal.value = true
}

function closeModal() {
    showModal.value = false
}

function checkAuth() {
    const auth = useAuth()
    console.log(auth.token)
    if (auth.token.value) {
      window.location.href = '/admin' // Если токен есть, идём в админку
    } else {
      openModal()       // Иначе открываем модалку с формой входа
    }
}

async function login() {
  try {
    const auth = useAuth()
    const response = await auth.loginReq(loginData)
    console.log(response)
    window.location.href = '/admin'
  }
  catch (error) {
    console.error('Login error:', error)
  }
}

</script>

<template>
    <footer class="footer-2">
        <section class="cont-ly">
            <nav class="flex sb flex-mob-col">
                <NuxtLink
                  to="/"
                  class="footer2-logo"
                  aria-label="Перейти на главную страницу сайта коттеджного посёлка Отрада"
                />
                <div class="flex flex-mob-col">
                    <nav class="fs21-16">
                        <NuxtLink
                          :to="contacts.phone1.link"
                          class="all2s flex aic white"
                          :aria-label="contacts.phone1.aria"
                        >
                            <Icon name="mynaui:telephone" class="s24" />
                          <span class="ml4">{{ contacts.phone1.inner_html }}</span>
                        </NuxtLink>
                    
                        <NuxtLink
                          :to="contacts.phone2.link"
                          class="all2s flex aic white mt0-6em"
                          :aria-label="contacts.phone2.aria"
                        >
                            <Icon name="mynaui:telephone" class="s24" />
                          <span class="ml4">{{ contacts.phone2.inner_html }}</span>
                        </NuxtLink>
                    </nav>
                    <nav class="ml32 mob-ml0 fs21-16 mob-mt12">
                        <NuxtLink
                            :to="contacts.mail.link"
                            class="all2s flex aic white"
                            :aria-label="contacts.mail.aria"
                          >
                            <Icon name="humbleicons:mail" class="s24" />
                            <span class="ml4">{{ contacts.mail.inner_html }}</span>
                          </NuxtLink>
                        <NuxtLink
                            :to="contacts.vk.link"
                            class="all2s flex aic white mt0-6em"
                            :aria-label="contacts.vk.aria"
                        >
                          <Icon name="basil:vk-outline" class="s24" />
                          <span class="ml4">{{ contacts.vk.inner_html }}</span>
                        </NuxtLink>
                    </nav>
                </div>
            </nav>
            <div class="flex sb mt32">
                <div class="fs14-12">
                    <span class="white">ИНН 32 1000025978</span>
                    <span class="white ml12">ОГРН 304324314900137</span>
                </div>
                <div>
                    <NuxtLink to="/" class="fs14-12 white">
                        Политика конфиденциальности
                    </NuxtLink>
                </div>
            </div>
            <div @click="checkAuth" class="fs12-10 white">Все права защищены</div>
        </section>
    </footer>
    <Modal :show="showModal" @close="closeModal">
        <div class="fc ">
          <span class="f500 fs21 dark-font">Вход</span>
          <div class="mt16 flex">
            <Icon name="lsicon:user-filled" class="accent s32" />
            <input class="i280 i-text-light ml6" v-model="loginData.login" placeholder="Логин" type="text">
          </div>
          <div class="mt12 flex">
            <Icon name="mdi:password" class="accent s32" />
            <input class="i280 i-text-light ml6" placeholder="Пароль" v-model="loginData.password" type="text">
          </div>
          <button class="accent-btn asc i180 mt16" @click="login">Войти</button>
        </div>
  </Modal>
</template>

<style scoped>
.footer-2 {
    background-color: #0A5A5AC7;
    position: relative;
}
.footer2-logo {
    background-image: url('/assets/v2/logo-v2.png');
    background-repeat: no-repeat;
    background-size: contain;
}
.footer-2::before {
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
    .footer2-logo {
        width: 240px;
        height: 100px;
    }
    .footer-2 {
        padding-top: 88px;
        border-top-left-radius: 72px;
        border-top-right-radius: 72px;
        padding-bottom: 42px;
    }
}
@media(max-width:759px) {
    .footer2-logo {
        width: 240px;
        height: 100px;
    }
    .footer-2 {
        padding-top: 32px;
        border-top-left-radius: 32px;
        border-top-right-radius: 32px;
        padding-bottom: 42px;
        align-items: center;
    }  
}
</style>