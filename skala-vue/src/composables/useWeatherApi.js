import { ref } from 'vue'
import { fetchWeatherByCityId } from '../services/weatherApi'

const CACHE_TTL = 10 * 60 * 1000
const weatherCache = new Map()
const pendingRequests = new Map()

const getCachedWeather = (cityId) => {
  const cached = weatherCache.get(cityId)
  if (!cached || Date.now() - cached.createdAt >= CACHE_TTL) return null
  return cached.data
}

const requestCityWeather = (city, signal) => {
  const cached = getCachedWeather(city.id)
  if (cached) return Promise.resolve(cached)

  if (pendingRequests.has(city.id)) return pendingRequests.get(city.id)

  const request = fetchWeatherByCityId(city.id, signal)
    .then((data) => {
      weatherCache.set(city.id, { createdAt: Date.now(), data })
      return data
    })
    .finally(() => pendingRequests.delete(city.id))

  pendingRequests.set(city.id, request)
  return request
}

const getErrorMessage = (error) => {
  if (error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError') return ''
  return '실시간 날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
}

export function useWeatherApi() {
  const isLoading = ref(false)
  const errorMessage = ref('')
  let abortController = null

  const fetchWeatherList = async (cities) => {
    abortController?.abort()
    abortController = new AbortController()
    isLoading.value = true
    errorMessage.value = ''

    const results = await Promise.allSettled(cities.map((city) => requestCityWeather(city, abortController.signal)))
    const weatherList = results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value)

    if (results.some((result) => result.status === 'rejected')) {
      const error = results.find((result) => result.status === 'rejected')?.reason
      errorMessage.value = getErrorMessage(error)
    }

    isLoading.value = false
    return weatherList
  }

  const fetchWeatherDetail = async (city) => {
    abortController?.abort()
    abortController = new AbortController()
    isLoading.value = true
    errorMessage.value = ''

    try {
      return await requestCityWeather(city, abortController.signal)
    } catch (error) {
      errorMessage.value = getErrorMessage(error)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const cancelRequests = () => abortController?.abort()

  return { isLoading, errorMessage, fetchWeatherList, fetchWeatherDetail, cancelRequests }
}
