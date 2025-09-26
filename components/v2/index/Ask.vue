<script setup>
import { isStringLengthBetween } from '~/assets/validators/simple'
import { useRuntimeConfig } from '#app'
import { reactive } from 'vue';

const userData = reactive({
    name: '',
    phone: '',
})

const config = useRuntimeConfig()

const submitForm = async () => {
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
        comment: 'Заявка с формы главной страницы'
      }
    })
    alert(`Спасибо, ${userData.name}! Ваша заявка принята.`)
    userData.name = ''
    userData.phone = ''

  } catch (error) {
    console.error('Ошибка отправки заявки:', error)
  }
}

</script>


<template>
    <div class="cont-ly fcc">
        <section class="ask-ly flex sb">
            <section class="fc aic">
                <h3 class="caps fs24-18 f400">Купить дом</h3>
                <div class="fc aic">
                    <input type="text" class="i-text-3 i240 fs18-14" placeholder="Ваше имя" v-model="userData.name">
                    <input type="text" class="i-text-3 i240 fs18-14 mt12" placeholder="Номер телефона" v-model="userData.phone">
                    <button class="accent-gradient-btn ask-btn-submit i210 mt24" @click="submitForm">Оставить заявку</button>
                </div>
                <span class="grey fs12-10 i240 mt6">Нажимая Оставить заявку вы соглашаетесь с Политикой конфиденциальности</span>
            </section>
            <img src="/assets/v2/desktop/ask/6.webp" alt="Брендовые узоры КП Отрада" class="mobile-none">
        </section>
    </div>
</template>

<style scoped>
    .ask-ly {
        background-color: var(--accent-grey);
        border-radius: 18px;
    }
    @media(min-width:760px) {
        .ask-ly {
            width: 720px;
            padding: 14px;
        }
        .ask-ly > img {
            width: 340px;
            border-radius: 16px;
        }
        .ask-ly > section {
            flex-grow: 1;
        }
        .ask-btn-submit {
            padding: 8px 24px;
            border-radius: 18px;
        }
    }
    @media(max-width:759px) {
        .ask-ly {
            width: 90%;
            padding: 12px;
            margin-inline: auto;
        }
        .ask-btn-submit {
            padding: 8px 24px;
            border-radius: 14px;
            margin-top: 16px !important;
        }
    }

</style>