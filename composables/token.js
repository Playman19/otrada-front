import { watch, useState } from '#imports' // nuxt 3-шный импорт reactive API

export function useToken() {
  // Инициализация токена с синхронным чтением из localStorage, если на клиенте
  const token = useState('auth_token', () => {
    if (import.meta.client) { // проверяем, что это клиент
      return localStorage.getItem('auth_token')
    }
    return null
  })

  // Следим за изменением token.value чтобы синхронизировать localStorage
  watch(token, (newValue) => {
    if (import.meta.client) {
      if (newValue) {
        localStorage.setItem('auth_token', newValue)
      } else {
        localStorage.removeItem('auth_token')
      }
    }
  })

  const setToken = (newToken) => {
    token.value = newToken
  }

  const clearToken = () => {
    token.value = null
  }

  const getAuthHeaders = () => {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }

  return {
    token,
    setToken,
    clearToken,
    getAuthHeaders
  }
}
