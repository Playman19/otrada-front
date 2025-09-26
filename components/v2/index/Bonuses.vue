<script setup>
    const whys = [
        'Развитая ифраструктура',
        'Комфорт и безопасность',
        'Экологичность',
        'Качественное строительство',
        'Близость к природе',
    ]
</script>

<template>
    <div>
        <section class="bonuses-ly fc cont-ly">
            <aside></aside>
            <ul>
                <li v-for="item in whys">{{ item }}</li>
            </ul>
        </section>
    </div>
</template>

<style scoped>
    .bonuses-ly {
        background-image: url('/assets/v2/desktop/why/2.webp');
        background-size: cover;
        margin-bottom: 64px;
        overflow: hidden;
    }
    .bonuses-ly > aside {
        background-image: url('/assets/v2/desktop/why/3.png');
        background-repeat: no-repeat;
        background-size: contain;
    }
    .bonuses-ly > ul {
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
    }
    .bonuses-ly > ul > li {
        background-color: #E8E8E863;
        border: 1px solid #ffffff60;
        color: var(--white);
    }
    @media(min-width:760px) and (max-width:1249px) {
        .bonuses-ly {
            width: 90%;
        }
    }
    @media(min-width:760px) {
        .bonuses-ly {
            border-radius: 30px;
        }
        .bonuses-ly > ul {
            gap: 12px;
            width: 720px;
            margin-top: 64px;
        }
        .bonuses-ly > ul > li {
            font-size: 21px;
            padding: 4px 12px;
            border-radius: 16px;
        }
        .bonuses-ly {
            padding: 30px;
        }
        .bonuses-ly > aside {
            width: 453px;
            height: 36px;
        }
    }
    @media(max-width:759px) {
        .bonuses-ly {
            border-radius: 30px;
            width: 80%;
            padding: 18px;
        }
        .bonuses-ly > ul {
            gap: 12px;
            margin-top: 64px;
        }
        .bonuses-ly > ul > li {
            font-size: 18px;
            padding: 4px 12px;
            border-radius: 16px;
        }
        .bonuses-ly > aside {
            width: 280px;
            height: 36px;
        }
    }
</style>