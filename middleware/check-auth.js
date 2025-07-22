export default defineNuxtRouteMiddleware(() => {
  if (!import.meta.client) {
    return 
  }

  const auth = useToken()
  
  if (!auth.token.value) {
    return navigateTo('/')
  }
})
