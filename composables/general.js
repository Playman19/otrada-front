export const useApi = () => {
  const config = useRuntimeConfig()
  const API_URL = config.public.apiUrl

  // Получение домов
  const getHouses = (options = {}) => {
    return useFetch(`${API_URL}/api/houses?category=active`, options)
  }

  // Получение дома
  const getHouse = (id, options = {}) => {
    return useFetch(`${API_URL}/api/houses/${id}`, options)
  }

  return {
    getHouses,
    getHouse
  }
}
