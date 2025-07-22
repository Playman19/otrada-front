export default defineNuxtRouteMiddleware(async (to, from) => {
  const houseId = to.params.id
  
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl
  
  const houses = await $fetch(`${apiUrl}/api/houses`)
  
  const houseExists = houses.data.some(h => h.id == houseId)
  if (!houseExists) {
    // Если дом с таким id не найден, редирект на главную
    return navigateTo('/')
  }
})