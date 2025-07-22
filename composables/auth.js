import { useToken } from "#imports"

export const useAuth = () => {

    const { token, setToken, clearToken, getAuthHeaders } = useToken()

    const API_URL = useRuntimeConfig().public.apiUrl


  const loginReq = async (data) => {
    const config = useRuntimeConfig()
    const API_URL = config.public.apiUrl

    try {
      const response = await $fetch(`${API_URL}/api/login`, {
        method: 'POST',
        body: data
      })

      if(response && response.access_token) {
        setToken(response.access_token)
      }
      else {
        alert('Неверный логин или пароль')
      }
      return response
    } catch (error) {
      throw error
    }
  }

  const logoutReq = async () => {
    try {
      await $fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        headers: getAuthHeaders()
      })
      clearToken()
    } catch (error) {
      clearToken()
      throw error
    }
  }

  return {
    loginReq,
    token,
    getAuthHeaders,
    logoutReq
  }

}