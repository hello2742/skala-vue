import { computed, ref } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 55, wind: 2.1, emoji: '☀️' },
  { id: 'city_02', name: '수원', temp: 24, status: '비', humidity: 78, wind: 1.6, emoji: '🌧️' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', humidity: 68, wind: 3.4, emoji: '⛅' },
  { id: 'city_04', name: '제주', temp: 30, status: '맑음', humidity: 62, wind: 4.0, emoji: '🌤️' },
])

export function useWeather() {
  const searchKeyword = ref('')
  const selectedMessage = ref('지역 카드를 눌러 선택해 보세요.')

  const filteredWeatherList = computed(() => {
    return weatherList.value.filter((city) => city.name.includes(searchKeyword.value))
  })

  const searchCity = (event) => {
    searchKeyword.value = event.target.value
  }

  const selectCity = (cityName) => {
    selectedMessage.value = `${cityName}이 선택되었습니다.`
  }

  const showDetail = (cityName, status) => {
    window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
  }

  return {
    searchKeyword,
    selectedMessage,
    filteredWeatherList,
    searchCity,
    selectCity,
    showDetail,
  }
}
