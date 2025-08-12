<template>
  <footer class="footer">
    <section class="cont-ly">
      <nav>
        <NuxtLink
          to="/"
          class="footer-logo"
          aria-label="Перейти на главную страницу сайта коттеджного посёлка Отрада"
        />
      </nav>
      <section>
        <nav class="fc">
          <NuxtLink
            :to="contacts.phone1.link"
            class="hover-accent-blue-lightest all2s flex aic fs21-16 bold white"
            :aria-label="contacts.phone1.aria"
          >
            <aside class="bgimg icon-min phone-white-icon"></aside>
            <span class="ml4">{{ contacts.phone1.inner_html }}</span>
          </NuxtLink>

          <NuxtLink
            :to="contacts.phone2.link"
            class="hover-accent-blue-lightest all2s flex aic fs21-16 bold white mt0-6em"
            :aria-label="contacts.phone2.aria"
          >
            <aside class="bgimg icon-min phone-white-icon"></aside>
            <span class="ml4">{{ contacts.phone2.inner_html }}</span>
          </NuxtLink>
        </nav>

        <nav class="fc">
          <NuxtLink
            :to="contacts.mail.link"
            class="hover-accent-blue-lightest all2s flex aic fs21-16 f500 white"
            :aria-label="contacts.mail.aria"
          >
            <aside class="bgimg icon-min email-white-icon"></aside>
            <span class="ml4">{{ contacts.mail.inner_html }}</span>
          </NuxtLink>
        </nav>

        <div class="fc white rekvizits">
          <div class="flex">
            <aside class="bgimg icon-min tax-white-icon"></aside>
            <span class="ml4">ИНН 32 1000025978</span>
          </div>
          <div class="flex">
            <aside class="bgimg icon-min tax-white-icon"></aside>
            <span class="ml4">ОГРН 304324314900137</span>
          </div>
          <div class="flex" @click="checkAuth">
            <aside class="bgimg icon-min copyright-white-icon"></aside>
            <span class="ml4">Все права защищены</span>
          </div>
        </div>
      </section>
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
<script>
import contacts from '../../config/contacts'
import Modal from '../modals/Modal.vue';
import { ref } from 'vue';
import { useAuth } from '~/composables/auth.js';
import { useRouter } from 'vue-router'


export default {
    data() {
        return {
            contacts: contacts,
            showModal: false,
            loginData: {
              login: '',
              password: ''
            }
        }
    },
    methods: {
      openModal() {
        this.showModal = true
      },
      closeModal() {
        this.showModal = false
      },
      checkAuth() {
          const auth = useAuth()
          console.log(auth.token)
          if (auth.token.value) {
            window.location.href = '/admin' // Если токен есть, идём в админку
          } else {
            this.openModal()       // Иначе открываем модалку с формой входа
          }
      },
      async login() {
          try {
            const auth = useAuth()
            const response = await auth.loginReq(this.loginData)
            console.log(response)
            window.location.href = '/admin'
          }
          catch (error) {
            console.error('Login error:', error)
          }
        }
    },
    components: {
      Modal
    }
}
</script>
<style>
.footer {
    background-color: var(--accent);
}
.footer > section,.footer > section > section {
    display: flex;
}
.footer-logo {
    background-image: url('../../assets/logos/logotext-vertical-dark.webp');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: block;
}
.rekvizits {
    font-size: 12px;
}
@media(min-width:1200px) {
    .footer {
        padding: 42px 0;
    }
    .footer > section > section {
        flex-grow: 1;
        margin-left: 32px;
    }
    .footer > section,.footer > section > section {
        justify-content: space-between;
    }
    .footer-logo {
        width: 320px;
        height: 280px;
    }
}
@media(min-width:760px) and (max-width:1199px) {
    .footer {
        padding: 36px 0;
    }
    .footer > section {
        justify-content: space-between;
    }
    .footer > section > section {
        flex-direction: column;
    }
    .footer > section > section > nav {
        margin-bottom: 26px;
    }
    .footer-logo {
        width: 300px;
        height: 260px;
    }
}
@media(max-width:759px) {
    .footer {
        padding: 32px 0 100px 0;
    }
    .footer > section, .footer > section > section {
        flex-direction: column;
        align-items: center;
    }
    .footer > section > section > nav {
        margin-bottom: 26px;
    }
    .footer-logo {
        width: 300px;
        height: 260px;
    }
}   
</style>