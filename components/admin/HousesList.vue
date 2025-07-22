<template>
    <div class="cont-ly" v-if="isList">
        <h2 class="f500 white fs24">Список домов</h2>
        <div class="flex aic">
            <button v-for="filter in filters" class="flex aic admin-filter-btn mr12" :class="{ 'admin-filter-btn-active': filter.id === defaultFilter }" @click="setFilter(filter.id)">
                <Icon :name="filter.icon" class="s26" />
                <span class="ml4 f600 fs18">{{ filter.title }}</span>
            </button>
        </div>
        <div class="flex fc mt12" v-if="list">
            <div v-for="item in list" class="flex sb admin-item mt8">
                <img :src="item.main_img_url" alt="картинка">
                <div class="grow ml32 fc">
                    <h3 class="mt0 fs24 f500 accent-dark hover-accent-blue-light cp all2s" @click="gotoEditHouse(item.id)">{{ item.title }}</h3>
                    <span class="grey mt32">{{ item.location }}</span>
                    <span class="alternate-dark fs14 mt8">{{ item.address }}</span>
                </div>
                <div class="fc sb">
                    <span class="fs28 f500 dark-font">{{ formattedPrice(item.price) }} ₽</span>
                    <button class="flex aic accent-btn admin-list-operation-button" v-if="item.category === 'active'" @click="updateHouse(item.id, 'archive')">
                        <Icon name="material-symbols:archive-outline" class="s32"/>
                        <span class="f600 ml4">Снять с продажи</span>
                    </button>
                    <button class="flex aic accent-btn admin-list-operation-button" v-else @click="updateHouse(item.id, 'active')">
                        <Icon name="material-symbols:sell-outline" class="s32"/>
                        <span class="f600 ml4">Вернуть в продажу</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <HouseData v-else :houseId="houseIdChanged" @go-list-emit="goBackToList" />
</template>
<script>
import HouseData from './HouseData.vue'

export default {
    data() {
        return {
            filters: [
                { id: 1, title: 'Все дома', icon: 'material-symbols:home-outline-rounded' },
                { id: 2, title: 'В продаже', icon: 'material-symbols:sell-outline' },
                { id: 3, title: 'Архив', icon: 'material-symbols:archive-outline' },
            ],
            defaultFilter: 2,
            fullList: false,
            list: false,
            isList: true,
            houseIdChanged: false
        }
    },
    methods: {
        goBackToList() {
            this.isList = true
            this.fetchList()
        },
        gotoEditHouse(id) {
            this.houseIdChanged = id
            this.isList = false
        },
        formattedPrice(num) {
          if (!num && num !== 0) return ''
          return new Intl.NumberFormat('ru-RU').format(num)
        },
        setFilter(id) {
            if(id !== this.defaultFilter) {
                this.defaultFilter = id
                // фильтрация по статусам
                this.applyFilter()
            }
        },
        async fetchList() {
          this.loading = true
          this.error = null
          try {
            // Важно: apiUrl берётся из runtimeConfig, иначе можете вместо apiUrl сразу в fetch полный урл подставить
            const config = useRuntimeConfig()
            const apiUrl = config.public.apiUrl

            const response = await $fetch(`${apiUrl}/api/houses`, {
              headers: {
                'Accept': 'application/json'
              }
            })

            this.fullList = response.data.sort((a, b) => b.id - a.id)
            this.applyFilter()

          } catch (e) {
            console.log(e)
          }
        },
        async updateHouse(id, category) {
          try {
            const auth = useAuth()
            const config = useRuntimeConfig()
            const apiUrl = config.public.apiUrl
        
            const formData = new FormData()
            formData.append('_method', 'PATCH')
            formData.append('category', category)
        
            const response = await $fetch(`${apiUrl}/api/admin/houses/${id}`, {
              method: 'POST', // Используем POST с _method=PATCH, как в curl
              headers: {
                Authorization: `Bearer ${auth.token.value}`,
                Accept: 'application/json'
              },
              body: formData
            })
        
            this.fetchList()
            
          } catch (e) {
            console.log(e)
          } 
        },
        applyFilter() {
          switch(this.defaultFilter) {
            case 1: // Все дома
              this.list = this.fullList
              break
            case 2: // В продаже (пример — фильтруем по статусу)
              this.list = this.fullList.filter(item => item.category === 'active')
              break
            case 3: // Архив
              this.list = this.fullList.filter(item => item.category === 'archive')
              break
            default:
              this.list = this.fullList
          }
        },
    },
    created() {
      this.fetchList()
    },
    components: {
        HouseData
    }
}
</script>
<style>
    .admin-filter-btn {
        padding: 12px 25px;
        border-radius: 18px;
        border: none;
        outline: none;
        background-color: var(--white);
        color: var(--dark-font);
        transition: all .2s ease-in-out;
    }
    .admin-filter-btn-active {
        background-color: var(--alternate-light) !important;
        color: var(--accent);
    }
    .admin-item {
        padding: 12px 16px;
        background-color: white;
    }
    .admin-item > img {
        width: 240px;
        height: 180px;
    }
    .admin-list-operation-button {
        width: 192px;
        justify-content: center;
        border: none;
        outline: none;
    }
</style>