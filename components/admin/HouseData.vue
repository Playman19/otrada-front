<template>
    <Modal :show="showModal" :data="modalData" @close="closeModal">
        <template #default="{ data }">
            <div v-if="modalType === 'map'">
                <div v-html="data.map">

                </div>
            </div>
        </template>
    </Modal>
    <div class="cont-ly">
        <h2 class="f500 white fs24" v-if="!this.houseId">Добавить дом</h2>
        <div v-else class="flex aic">
            <button class="off-btn" @click="backEmit">
                <Icon name="material-symbols:logout" class="s32 white" />
            </button>
            <h2 class="f500 white fs24 ml4" >Редактировать дом</h2>
        </div>
        <div class="flex sb">
            <div class="fc">
                <div class="admin-main_img-container">
                    <div v-if="!house.main_img" >
                        <input type="file" class="admin-main-img-file" @change="handleMainImgChange">
                        <Icon name="ic:outline-photo" class="s72 white" />
                        <span class="white fs24 f600">Загрузить изображение</span>
                    </div>
                    <img v-if="house.main_img" :src="house.main_img_url" alt="">
                    <aside v-if="house.main_img">
                        <div>
                            <Icon name="uil:edit" />
                            <input type="file" class="admin-set-main_img" @change="updateMainImage">
                        </div>
                    </aside>
                </div>
                <div class="admin-carousel-edit flex mt24">
                    <div v-for="car in house.carousel_images">
                        <img :src="car.image_url" alt="фото дома">
                    </div>
                    <div class="fcc admin-add-carousel">
                        <input v-if="houseId" type="file" multiple @change="addCarouselImages">
                        <input v-else type="file" multiple @change="handleCarouselImagesChange">
                        <Icon name="mdi:image-plus-outline" class="s32 white"/>
                    </div>
                </div>
                <div>
                    <h3 class="white f500 fs21 mt24">Характеристики</h3>
                    <div class="fc">
                        <div v-for="feature in features" class="flex aic sb mt6">
                            <Icon :name="feature.icon" class="s24 white" />
                            <span class="grow ml6 white f500">{{ feature.ru }}</span>
                            <input type="text" class="i-text" :placeholder="feature.ru" v-model="house[`${feature.key}`]">
                        </div>
                    </div>
                </div>
            </div>
            <div class="fc">
                <div class="fc aie">
                    <span class="fs12 white">Название</span>
                    <input type="text" class="i-text mt3 i320" placeholder="Название" v-model="house.title">
                </div>
                <div class="fc aie mt16">
                    <span class="fs12 white">Цена</span>
                    <input type="text" class="i-text mt3 i210" placeholder="Цена" v-model="house.price">
                </div>
                <div class="fc aie mt16">
                    <span class="fs12 white">Местоположение</span>
                    <input type="text" class="i-text mt3 i210" placeholder="Местоположение" v-model="house.location">
                </div>
                <div class="fc aie mt16">
                    <span class="fs12 white">Адрес</span>
                    <input type="text" class="i-text mt3 i320" placeholder="Адрес" v-model="house.address">
                </div>
                <div class="fc aie mt16">
                    <span class="fs12 white">Описание</span>
                    <textarea class="i-text admin-textarea" placeholder="Описание" v-model="house.description"></textarea>
                </div>
                <div class="fc aie mt16">
                    <span class="fs12 white">Карта</span>
                    <div class="flex">
                        <input type="text" v-model="house.map" class="i-text mt3" placeholder="Код карты">
                        <NuxtLink :to="mapResource" target="_blank" class="accent-green-btn admin-gotomap ml8">
                            <Icon name="uil:create-dashboard" />
                            <span class="fs14 f500 ml4">Создать карту</span>
                        </NuxtLink>
                        <button class="accent-btn ml8 i120" @click="openMapModal">
                            <Icon name="material-symbols:map-outline-rounded"  />
                            <span>Проверить</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
        <div class="fc aie">

            <button class="accent-green-btn i210 fs21" v-if="houseId" @click="saveHouse">Сохранить</button>
            <button class="accent-green-btn i210 fs21" v-else @click="submitHouse">Разместить</button>
        </div>
    </div>
</template>
<script>
import Modal from '~/components/modals/Modal.vue'


export default {
    data() {
        return {
            house: {},
            features: [
                { key: 'area_house', icon: 'carbon:floorplan', ru: 'Площадь дома' },
                { key: 'area_land', icon: 'carbon:area', ru: 'Площадь участка' },
                { key: 'land_type', icon: 'carbon:document', ru: 'Категория земель' },
                { key: 'floors_count', icon: 'carbon:home', ru: 'Количество этажей' },
                { key: 'year', icon: 'famicons:timer-outline', ru: 'Год постройки' },
                { key: 'electricity', icon: 'carbon:cloud-lightning', ru: 'Электричество' },
                { key: 'water', icon: 'ion:water-outline', ru: 'Вода' },
            ],
            mapResource: 'https://yandex.ru/map-constructor',
            showModal: false,
            modalType: '',
            modalData: {},
            originalHouse: {},
        }
    },
    components: {
        Modal
    },
    methods: {
        openMapModal() {
          this.modalType = 'map'
          this.modalData = { map: this.house.map }
          this.showModal = true
        },
        closeModal() {
          this.showModal = false
        },
        async fetchHouseDetails(houseId) {
          try {
            const config = useRuntimeConfig()
            const apiUrl = config.public.apiUrl

            const response = await $fetch(`${apiUrl}/api/houses/${houseId}`)

            this.house = response.data
            this.originalHouse = JSON.parse(JSON.stringify(this.house))
          } catch (e) {
            console.error(e)
          }
        },
        async saveHouse() {
           const changedFields = {} // сюда соберём только изменённые простые поля
           const formData = new FormData()
        
           // Список ключей, которые можем редактировать (по вашему объекту)
           const keysToCheck = [
             'title', 'price', 'location', 'category', 'description',
             'area_house', 'area_land', 'electricity', 'water',
             'year', 'land_type', 'floors_count', 'address', 'map'
           ]
        
           // Проверяем обычные поля на изменения
           keysToCheck.forEach(key => {
             if (this.house[key] !== this.originalHouse[key]) {
               changedFields[key] = this.house[key]
               formData.append(key, this.house[key])
             }
           })
       
           // Добавляем обязательное поле _method=PATCH
           formData.append('_method', 'PATCH')
         
           console.log(formData)
           // Отправляем запрос
           try {
             const auth = useAuth()
             const config = useRuntimeConfig()
             const apiUrl = config.public.apiUrl

             await $fetch(`${apiUrl}/api/admin/houses/${this.house.id}`, {
               method: 'POST',
               headers: {
                 Authorization: `Bearer ${auth.token.value}`,
                 Accept: 'application/json'
               },
               body: formData
             })
         
             // Если успешно, обновим originalHouse копией текущих данных
             this.originalHouse = JSON.parse(JSON.stringify(this.house))
         
             // Можно показать уведомление об успехе, либо перейти куда-то
             alert('Дом успешно сохранён!')
           } catch (e) {
             console.error('Ошибка сохранения:', e)
             alert('Ошибка при сохранении дома.')
           }
        },
        async updateMainImage(event) {
            const file = event.target.files[0]
            if(!file) return
      
          const formData = new FormData()
          formData.append('_method', 'PATCH')
          formData.append('main_img', file)
      
          try {
            const auth = useAuth()
            const config = useRuntimeConfig()
            const apiUrl = config.public.apiUrl
        
            await $fetch(`${apiUrl}/api/admin/houses/${this.house.id}`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${auth.token.value}`,
                Accept: 'application/json'
              },
              body: formData
            })

            this.fetchHouseDetails(this.house.id) // обновляем данные дома
            event.target.value = null
          } catch (error) {
            console.error(error)
            alert('Ошибка при обновлении главного изображения')
          }
        },
        async addCarouselImages(event) {
          const files = event.target.files
            if (!files || files.length === 0) {
              return
            }
      
          const formData = new FormData()
          formData.append('_method', 'PATCH')
      
          const startIndex = (this.house.carousel_images && this.house.carousel_images.length) || 0

          for (let i = 0; i < files.length; i++) {
            formData.append(`carousel_images[${startIndex + i}}]`, files[i])
          }
      
          try {
            const auth = useAuth()
            const config = useRuntimeConfig()
            const apiUrl = config.public.apiUrl
        
            await $fetch(`${apiUrl}/api/admin/houses/${this.house.id}`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${auth.token.value}`,
                Accept: 'application/json'
              },
              body: formData
            })
        
            alert('Изображения добавлены в карусель')
            this.fetchHouseDetails(this.house.id) // обновляем данные дома
            event.target.value = null // очищаем input после загрузки
          } catch (error) {
            console.error(error)
            alert('Ошибка при добавлении изображений в карусель')
          }
        },
        backEmit() {
            this.$emit('go-list-emit')
        },
        fillDefaultConstruction() {
            this.house = {
                main_img: null,
                carousel_images: [],
                title: '',
                price: '',
                location: '',
                category: 'active',
                description: '',
                area_house: '',
                area_land: '',
                electricity: '',
                water: '',
                year: '',
                land_type: '',
                floors_count: '',
                address: '',
                map: ''
            }
        },
        handleMainImgChange(event) {
            const files = event.target.files

            if (files && files.length > 0) {
              this.house.main_img = files[0] 
            } else {
              this.house.main_img = null
            }
        },
        handleCarouselImagesChange(event) {
          const files = event.target.files
          if (files && files.length > 0) {
            this.house.carousel_images = [
              ...this.house.carousel_images,
              ...Array.from(files)
            ]
          }
        },
        async submitHouse() {
            try {
              const formData = new FormData()

              // Список остальных полей (строковых/числовых)
              const fields = [
                'title', 'price', 'location', 'category', 'description',
                'area_house', 'area_land', 'electricity', 'water',
                'year', 'land_type', 'floors_count', 'address', 'map'
              ]

            for (const key of fields) {
             const value = this.house[key]
                   
             if (key === 'price') {
               // price должен быть числом > 0
               const num = Number(value)
               if (!value || isNaN(num) || num <= 0) {
                 alert(`Поле "price" обязательно и должно быть числом больше 0`)
                 return
               }
             } else if (key === 'map') {
               // Если пустое, заменяем на "-"
               if (!value || String(value).trim().length === 0) {
                 this.house.map = "-"
               }
             } else {
               // Остальные поля обязательны: длина строки ≥ 1
               if (!value || String(value).trim().length < 1) {
                 alert(`Поле "${key}" обязательно для заполнения и не может быть пустым`)
                 return
               }
             }
            }

              // Добавляем файл главной картинки
              if (this.house.main_img) {
                formData.append('main_img', this.house.main_img)
              }

                if ((!Array.isArray(this.house.carousel_images) || this.house.carousel_images.length === 0) && this.house.main_img) {
                  formData.append('carousel_images[0]', this.house.main_img)
                } else {
                  // Иначе добавляем все файлы из carousel_images, если они есть
                  if (Array.isArray(this.house.carousel_images)) {
                    this.house.carousel_images.forEach((file, idx) => {
                      formData.append(`carousel_images[${idx}]`, file)
                    })
                  }
                }


              fields.forEach(key => {
                if (this.house[key] !== undefined && this.house[key] !== null) {
                  formData.append(key, this.house[key])
                }
              })

              const auth = useAuth()
              const config = useRuntimeConfig()
              const apiUrl = config.public.apiUrl

              // Отправка POST-запроса с formData и заголовком авторизации
              await $fetch(`${apiUrl}/api/admin/houses`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${auth.token.value}`,
                  Accept: 'application/json'
                },
                body: formData
              })

              alert('Дом успешно сохранён')
              this.$emit('set-mode-list-emit')
            } catch (error) {
              console.error('Ошибка при сохранении дома:', error)
              alert('Ошибка при сохранении дома')
            }
        }
    },
    props: {
        houseId: {
            required: false
        }
    },
    created() {
        if(this.houseId) {
            this.fetchHouseDetails(this.houseId)
        }
        else {
            this.fillDefaultConstruction()
        }
    }
}
</script>
<style>
    .admin-textarea {
        height: 220px;
        width: 480px;
    }
    .admin-main_img-container {
        position: relative;
        width: 400px;
        height: 300px;
        overflow: hidden;
    }
    .admin-main_img-container > div {
        width: 390px;
        height: 290px;
        display: flex;
        flex-direction: column;
        border: 5px solid var(--white);
        justify-content: center;
        align-items: center;
        position: relative;

    }
    .admin-main-img-file {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 10;
    }
    .admin-main_img-container > img {
        width: 400px;
        height: 300px;
    }
    .admin-main_img-container > aside {
        position: absolute;
        right: 16px;
        bottom: 10px;
        border: none;
        outline: none;
        cursor: pointer;
        background-color: transparent;
        color: var(--white);
        font-size: 42px;
    }
    .admin-main_img-container > aside > div {
        position: relative;
    }
    .admin-set-main_img {
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
        top: 0;
        left: 0;
    }
    .admin-carousel-edit {
        gap: 6px;
        flex-wrap: wrap;
        width: 420px;
    }
    .admin-carousel-edit > div {
        width: 124px;
        height: 92px;
        overflow: hidden;
        display: flex;
    }
    .admin-carousel-edit > div > img {
        max-width: 124px;
        max-height: 92px;
    }
    .admin-add-carousel {
        border: 2px solid var(--white);
        position: relative;
    }
    .admin-add-carousel > input {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .admin-gotomap {
        display: flex;
        align-items: center;
        padding-inline: 6px;

    }
</style>