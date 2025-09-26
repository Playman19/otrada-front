<script setup>
    const text = 'Название «Отрада» — это не просто имя, а идея: место, где отдыхают душа и тело, где тишина и природа создают атмосферу настоящего уюта. Наш поселок расположен в живописном селе Отрадном, вблизи крупных районов города, что позволяет сохранять баланс между загородной жизнью и городской инфраструктурой.'
</script>

<template>
    <div>
        <section class="flex sb cont-ly flex-mob-col rest-ly">
            <img src="/assets/v2/rest.png" alt="" class="rest-img">
            <article class="dark-font fs24-16 rest-article mob-mt16">{{ text }}</article>
        </section>
    </div>
</template>

<style scoped>
    @media(min-width:760px) {
        .rest-img {
            width: 360px;
            height: 89px;
        }
        .rest-article {
            width: 670px;
        }
        .rest-ly {
            margin-bottom: 76px;
        }
    }
    @media(max-width:759px) {
        .rest-ly {
            margin-bottom: 36px;
        }
        .rest-img {
            width: 280px;
            height: 54px;
        }
    }
</style>
