import axios from 'axios'

// Axios 인스턴스와 공통 통신 규칙만 관리합니다.
const createApiClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    timeout: 8000,
    headers: { Accept: 'application/json' },
  })

  // Request Interceptor: OpenWeatherMap 요청에 API Key를 자동으로 추가합니다.
  client.interceptors.request.use((config) => {
    return config
  })

  // Response Interceptor: 외부 API 응답을 공통 형식으로 감쌉니다.
  client.interceptors.response.use(
    (response) => ({
      data: response.data,
      status: response.status,
      ok: response.status >= 200 && response.status < 300,
    }),
    (error) => {
      const message = error.response?.data?.message || error.message || '외부 API 요청에 실패했습니다.'
      return Promise.reject(new Error(message))
    },
  )

  return client
}

export const weatherApiClient = createApiClient('/api')

// Vite 개발 서버에서는 로컬 개발용 Key로 외부 API를 직접 확인합니다.
const createDevelopmentWeatherClient = () => {
  const client = createApiClient('https://api.openweathermap.org/data/2.5')

  client.interceptors.request.use((config) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
    if (!apiKey) return Promise.reject(new Error('개발용 OpenWeatherMap API Key가 설정되지 않았습니다.'))

    config.params = { ...config.params, appid: apiKey }
    return config
  })

  return client
}

export const developmentWeatherClient = createDevelopmentWeatherClient()
export const developmentOpenMeteoClient = createApiClient('https://air-quality-api.open-meteo.com/v1')
