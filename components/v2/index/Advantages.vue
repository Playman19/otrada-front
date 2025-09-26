<script setup>
    const advantages = [
        {title: 'Закрытая территория и безопасность', class: 'adv-1'},
        {title: 'Участки по 9 соток', class: 'adv-2'},
        {title: 'Юридическая чистота и ипотеки', class: 'adv-3'},
        {title: 'Единая эстетика', class: 'adv-4'},
    ]
</script>

<template>
    <section class="cont-ly fc aic mt32">
        <h3 class="caps f400 headers">Приемущества посёлка</h3>
        <ul class="adv-ly">
            <li v-for="adv in advantages" :class="adv.class" class="fcc">
                <span class="adv-text">{{ adv.title }}</span>
            </li>
        </ul>

    </section>
</template>

<style scoped>
    .adv-ly {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-between;
    }
    .adv-text {
        color: white;
        font-weight: 600;
    }
    .adv-2 {
        background: linear-gradient(102.59deg, #0A5A5A 42.17%, #15C0C0 125.31%);
    }
    .adv-3 {
        background-color: var(--accent);
        position: relative;
        overflow: hidden;
    }
    .adv-3::after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: url('/assets/v2/desktop/bonuses/1.png');
    }
    @media(min-width:760px) {
        .adv-1, .adv-2, .adv-3, .adv-4 {
            border-radius: 27px;
        }
        .adv-1, .adv-4 {
            width: 680px;
            height: 172px;
        }
        .adv-2, .adv-3 {
            width: 464px;
            height: 172px;
        }
        .adv-1, .adv-2 {
            margin-bottom: 22px;
        }
        .adv-1 {
            background-image: url('/assets/v2/desktop/bonuses/4-1.webp');
        }
        .adv-4 {
            background-image: url('/assets/v2/desktop/bonuses/4-2.webp');
        }
        .adv-text {
            font-size: 26px;
        }
    }
    @media(max-width:759px) {
        .adv-1, .adv-2, .adv-3, .adv-4 {
            border-radius: 16px;
        }
        .adv-1, .adv-4 {
            width: 56%;
            height: 84px;
        }
        .adv-2, .adv-3 {
            width: 40%;
            height: 84px;
        }
        .adv-1, .adv-2 {
            margin-bottom: 14px;
        }
        .adv-1 {
            background-image: url('/assets/v2/mobile/bonuses/4-1.webp');
        }
        .adv-4 {
            background-image: url('/assets/v2/mobile/bonuses/4-2.webp');
        }
        .adv-text {
            font-size: 12px;
            text-align: center;
        }
    }
</style>