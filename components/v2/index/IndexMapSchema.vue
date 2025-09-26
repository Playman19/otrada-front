<script setup>
import { Icon } from '#components';


const mapSchemaItems = [
    { title: 'Детский сад', icon: 'mdi:children-toy' },
    { title: 'Школа', icon: 'maki:school' },
    { title: 'Супермакет', icon: 'map:grocery-or-supermarket' },
    { title: 'Остановка', icon: 'mdi:bus-stop' },
]

</script>

<template>
    <section class="cont-ly flex aic sb flex-mob-col" id="about">
        <img src="/assets/v2/desktop/map/3.webp" alt="" class="map-schema-img">
        <section class="fc map-schema-right">
            <img src="/assets/v2/desktop/map/1.png" alt="">
            <ul class="flex map-schema-list">
                <li v-for="item in mapSchemaItems">
                    <div class="fcc schema-icons-ly">
                        <Icon :name="item.icon" class="white schema-icons-icon" />
                    </div>
                    <p>{{ item.title }}</p>
                </li>
            </ul>
        </section>
    </section>
</template>

<style scoped>
    .schema-icons-ly {
        border-radius: 50%;
        background-color: var(--accent);
    }
    .map-schema-list {
        flex-wrap: wrap;
    }
    .map-schema-list > li {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .map-schema-right {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    @media(min-width:760px) {
        .map-schema-right > img {
            width: 260px;
            margin-bottom: 30px;
        }
        .map-schema-right {
            width: 430px;
        }
        .map-schema-list > li > p {
            font-size: 24px;
            margin-top: 12px;
        }
        .map-schema-list > li {
            flex: 0 50%;
        }
        .map-schema-img {
            width: 620px;
            border-radius: 36px;
        }
        .schema-icons-ly {
            width: 120px;
            height: 120px;
        }
        .schema-icons-icon {
            width: 90px;
            height: 90px;
        }
    }
    @media(max-width:759px) {
        .map-schema-right > img {
            width: 210px;
            margin: 16px 12px;
        }
        .map-schema-right {
            width: 100%;
        }
        .map-schema-list > li > p {
            font-size: 12px;
            margin-top: 5px;
        }
        .map-schema-list {
            width: 100%;
            justify-content: space-between;
        }
        .map-schema-img {
            width: 100%;
            border-radius: 16px;
        }
        .schema-icons-ly {
            width: 56px;
            height: 56px;
        }
        .schema-icons-icon {
            width: 45px;
            height: 45px;
        }
    }
</style>