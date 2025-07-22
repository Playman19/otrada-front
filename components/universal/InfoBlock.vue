<template>
    <section class="cont-ly flexadapt-tab info-block">
        <img :src="article.img_src" :alt="article.img_alt">
        <section>
            <h2 class="accent f600">{{ article.title }}</h2>
            <article class="accent-dark f500">{{ article.article }}</article>
        </section>
    </section>
</template>
<script>
export default {
    props: {
        article: {
            required: false
        }
    }
}
</script>
<style>
.info-block > section > h2 {
    margin: 0 0 1em 0;
}
@media(min-width:1200px) {
    .info-block {
        padding: 36px 0;
    }
    .info-block > section > h2 {
        font-size: 32px;
    }
    .info-block > img {
        width: 420px;
        height: 300px;
        margin-right: 32px;
    }
}
@media(min-width:760px) and (max-width:1199px) {
    .info-block {
        padding: 32px 0;
    }
}
@media(max-width:759px) {
    .info-block {
        padding: 24px 0;
    }
    .info-block > section > h2 {
        font-size: 21px;
    }
    .info-block > section > article {
        font-size: 14px;
    }
}
</style>