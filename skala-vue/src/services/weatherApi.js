import { openMeteoClient, openWeatherClient } from './axiosClient'

// OpenWeatherMap 현재 날씨 API 호출만 담당합니다.
export const fetchCurrentWeather = async ({ lat, lon }) => {
  const { data } = await openWeatherClient.get('/weather', {
    params: { lat, lon, units: 'metric', lang: 'kr' },
  })

  return data
}

// OpenWeatherMap 공기질 API 호출만 담당합니다.
export const fetchAirQuality = async ({ lat, lon }) => {
  const { data } = await openWeatherClient.get('/air_pollution', {
    params: { lat, lon },
  })

  return data
}

// 기타 외부 API인 Open-Meteo 대기질 API 호출만 담당합니다.
export const fetchExternalAirQuality = async ({ lat, lon }) => {
  const { data } = await openMeteoClient.get('/air-quality', {
    params: {
      latitude: lat,
      longitude: lon,
      current: 'pm2_5,european_aqi',
      timezone: 'Asia/Seoul',
    },
  })

  return data
}
