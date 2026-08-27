/* global process */

import axios from 'axios'

const OPEN_WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const CACHE_TTL = 10 * 60 * 1000
const RATE_LIMIT_WINDOW = 60 * 1000
const RATE_LIMIT_MAX = 10

const cityCatalog = {
  city_01: { id: 'city_01', name: '서울', lat: 37.5665, lon: 126.978, emoji: '☀️', recommendation: '한강 산책' },
  city_02: { id: 'city_02', name: '수원', lat: 37.2636, lon: 127.0286, emoji: '🌧️', recommendation: '실내 카페' },
  city_03: { id: 'city_03', name: '부산', lat: 35.1796, lon: 129.0756, emoji: '⛅', recommendation: '해변 드라이브' },
  city_04: { id: 'city_04', name: '제주', lat: 33.4996, lon: 126.5312, emoji: '🌤️', recommendation: '오름 트레킹' },
}

const cache = new Map()
const rateLimit = new Map()

const getClientIp = (req) => req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'

const isRateLimited = (ip) => {
  const now = Date.now()
  const record = rateLimit.get(ip)

  if (!record || now - record.startedAt >= RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { startedAt: now, count: 1 })
    return false
  }

  record.count += 1
  return record.count > RATE_LIMIT_MAX
}

const toAirQualityLabel = (aqi) => ['알 수 없음', '좋음', '보통', '나쁨', '매우 나쁨', '위험'][aqi] ?? '알 수 없음'

const toEuropeanAirQualityLabel = (aqi) => {
  if (aqi == null) return '알 수 없음'
  if (aqi <= 20) return '좋음'
  if (aqi <= 40) return '보통'
  if (aqi <= 60) return '나쁨'
  if (aqi <= 80) return '매우 나쁨'
  return '위험'
}

const fetchCityWeather = async (city) => {
  if (!OPEN_WEATHER_API_KEY) throw new Error('weather configuration is unavailable')

  const [weatherResult, airQualityResult, externalAirQualityResult] = await Promise.allSettled([
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { lat: city.lat, lon: city.lon, appid: OPEN_WEATHER_API_KEY, units: 'metric', lang: 'kr' },
    }),
    axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {
      params: { lat: city.lat, lon: city.lon, appid: OPEN_WEATHER_API_KEY },
    }),
    axios.get('https://air-quality-api.open-meteo.com/v1/air-quality', {
      params: { latitude: city.lat, longitude: city.lon, current: 'pm2_5,european_aqi', timezone: 'Asia/Seoul' },
    }),
  ])

  if (weatherResult.status === 'rejected') throw new Error('weather request failed')

  const weather = weatherResult.value.data
  const airQuality = airQualityResult.status === 'fulfilled' ? airQualityResult.value.data : null
  const externalAirQuality = externalAirQualityResult.status === 'fulfilled' ? externalAirQualityResult.value.data : null
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

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: '허용되지 않은 요청입니다.' })

  const city = cityCatalog[req.query.cityId]
  if (!city) return res.status(400).json({ message: '올바르지 않은 도시입니다.' })
  if (isRateLimited(getClientIp(req))) return res.status(429).json({ message: '잠시 후 다시 시도해 주세요.' })

  const cached = cache.get(city.id)
  if (cached && Date.now() - cached.createdAt < CACHE_TTL) {
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=60')
    return res.status(200).json(cached.data)
  }

  try {
    const data = await fetchCityWeather(city)
    cache.set(city.id, { createdAt: Date.now(), data })
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=60')
    return res.status(200).json(data)
  } catch {
    return res.status(502).json({ message: '날씨 정보를 불러오지 못했습니다.' })
  }
}
