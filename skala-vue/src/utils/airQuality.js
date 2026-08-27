export const toAirQualityLabel = (aqi) => {
  const labels = ['알 수 없음', '좋음', '보통', '나쁨', '매우 나쁨', '위험']
  return labels[aqi] ?? labels[0]
}

export const toEuropeanAirQualityLabel = (aqi) => {
  if (aqi == null) return '알 수 없음'
  if (aqi <= 20) return '좋음'
  if (aqi <= 40) return '보통'
  if (aqi <= 60) return '나쁨'
  if (aqi <= 80) return '매우 나쁨'
  return '위험'
}
