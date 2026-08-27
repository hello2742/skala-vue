import { ref } from 'vue'
import {
  fetchAirQuality,
  fetchCurrentWeather,
  fetchExternalAirQuality,
} from '../services/weatherApi'
import { toAirQualityLabel, toEuropeanAirQualityLabel } from '../utils/airQuality'

const toWeatherItem = (city, weather, airQuality, externalAirQuality) => ({
  ...city,
  temp: Math.round(weather.main.temp),
  feelsLike: Math.round(weather.main.feels_like),
  status: weather.weather?.[0]?.description ?? city.status,
  humidity: weather.main.humidity,
  wind: Math.round((weather.wind?.speed ?? city.wind) * 10) / 10,
  emoji: city.emoji,
  airQuality:
    externalAirQuality?.current?.european_aqi != null
      ? toEuropeanAirQualityLabel(externalAirQuality.current.european_aqi)
      : toAirQualityLabel(airQuality?.list?.[0]?.main?.aqi),
  pm25: externalAirQuality?.current?.pm2_5 ?? null,
  recommendation: city.recommendation,
  isLive: true,
})

export function useWeatherApi() {
  const isLoading = ref(false)
  const errorMessage = ref('')

  const fetchCityWeather = async (city) => {
    const [weather, airQuality, externalAirQuality] = await Promise.all([
      fetchCurrentWeather(city),
      fetchAirQuality(city),
      fetchExternalAirQuality(city),
    ])

    return toWeatherItem(city, weather, airQuality, externalAirQuality)
  }

  const fetchWeatherList = async (cities) => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      // [과제 요구사항 1, 2] 여러 도시의 외부 API 데이터를 화면용 데이터로 변환합니다.
      return await Promise.all(cities.map(fetchCityWeather))
    } catch (error) {
      errorMessage.value = error.message || '실시간 날씨를 불러오지 못했습니다.'
      return cities.map((city) => ({ ...city, isLive: false }))
    } finally {
      isLoading.value = false
    }
  }

  const fetchWeatherDetail = async (city) => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      return await fetchCityWeather(city)
    } catch (error) {
      errorMessage.value = error.message || '실시간 날씨를 불러오지 못했습니다.'
      return { ...city, isLive: false }
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, errorMessage, fetchWeatherList, fetchWeatherDetail }
}
