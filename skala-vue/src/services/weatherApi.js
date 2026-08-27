import { cityCatalog } from '../data/cityCatalog'
import { toAirQualityLabel, toEuropeanAirQualityLabel } from '../utils/airQuality'
import { developmentOpenMeteoClient, developmentWeatherClient, weatherApiClient } from './axiosClient'

const toDevelopmentWeatherItem = (city, weather, airQuality, externalAirQuality) => {
  const europeanAqi = externalAirQuality?.current?.european_aqi
  const openWeatherAqi = airQuality?.list?.[0]?.main?.aqi

  return {
    ...city,
    temp: Math.round(weather.main.temp),
    feelsLike: Math.round(weather.main.feels_like),
    status: weather.weather?.[0]?.description ?? '정보 없음',
    humidity: weather.main.humidity,
    wind: Math.round((weather.wind?.speed ?? 0) * 10) / 10,
    airQuality: europeanAqi != null ? toEuropeanAirQualityLabel(europeanAqi) : toAirQualityLabel(openWeatherAqi),
    pm25: externalAirQuality?.current?.pm2_5 ?? null,
    isLive: true,
  }
}

const fetchDevelopmentWeather = async (city, signal) => {
  const [weatherResult, airQualityResult, externalAirQualityResult] = await Promise.allSettled([
    developmentWeatherClient.get('/weather', {
      params: { lat: city.lat, lon: city.lon, units: 'metric', lang: 'kr' },
      signal,
    }),
    developmentWeatherClient.get('/air_pollution', {
      params: { lat: city.lat, lon: city.lon },
      signal,
    }),
    developmentOpenMeteoClient.get('/air-quality', {
      params: { latitude: city.lat, longitude: city.lon, current: 'pm2_5,european_aqi', timezone: 'Asia/Seoul' },
      signal,
    }),
  ])

  if (weatherResult.status === 'rejected') throw weatherResult.reason

  const weather = weatherResult.value.data
  const airQuality = airQualityResult.status === 'fulfilled' ? airQualityResult.value.data : null
  const externalAirQuality = externalAirQualityResult.status === 'fulfilled' ? externalAirQualityResult.value.data : null
  return toDevelopmentWeatherItem(city, weather, airQuality, externalAirQuality)
}

// 개발은 Vite 직접 호출, 프로덕션은 Vercel Function만 호출합니다.
export const fetchWeatherByCityId = async (cityId, signal) => {
  if (import.meta.env.DEV) {
    const city = cityCatalog.find((item) => item.id === cityId)
    if (!city) throw new Error('올바르지 않은 도시입니다.')
    return fetchDevelopmentWeather(city, signal)
  }

  const { data } = await weatherApiClient.get('/weather', {
    params: { cityId },
    signal,
  })

  return data
}
