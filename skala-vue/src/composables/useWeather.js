import { computed, ref } from 'vue'

// [요구사항 1] v-for로 렌더링할 임의의 날씨 데이터 배열
// 과제에서 제시한 도시 외에 제주, 습도, 풍속, 이모지 데이터를 추가했습니다.
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 55, wind: 2.1, emoji: '☀️' },
  { id: 'city_02', name: '수원', temp: 24, status: '비', humidity: 78, wind: 1.6, emoji: '🌧️' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', humidity: 68, wind: 3.4, emoji: '⛅' },
  { id: 'city_04', name: '제주', temp: 30, status: '맑음', humidity: 62, wind: 4.0, emoji: '🌤️' },
])

export function useWeather() {
  // [요구사항 3] 한글 도시 검색어와 검색 결과를 관리합니다.
  const searchKeyword = ref('')
  const selectedMessage = ref('지역 카드를 눌러 선택해 보세요.')

  // 입력한 도시명이 포함된 날씨 카드만 화면에 표시합니다.
  const filteredWeatherList = computed(() => {
    return weatherList.value.filter((city) => city.name.includes(searchKeyword.value))
  })

  // [요구사항 3] View에서 전달받은 input 이벤트로 검색어를 갱신합니다.
  const searchCity = (event) => {
    searchKeyword.value = event.target.value
  }

  // [요구사항 4] 날씨 카드를 클릭했을 때 상태바 문구를 변경합니다.
  const selectCity = (cityName) => {
    selectedMessage.value = `${cityName}이 선택되었습니다.`
  }

  // [요구사항 4] 상세보기 버튼을 눌렀을 때 현재 날씨를 알립니다.
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
