import { computed, ref } from 'vue'
import { weatherMockData } from '../data/weatherMock'

export function useWeather() {
  // [요구사항 1] v-for로 렌더링할 반응형 날씨 데이터 배열
  const weatherList = ref(weatherMockData.map((city) => ({ ...city })))

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
  const selectCity = (city) => {
    selectedMessage.value = `${city.name}이 선택되었습니다.`
  }

  // [요구사항 4] 상세보기 버튼을 눌렀을 때 현재 날씨를 알립니다.
  const showDetail = (city) => {
    window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
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
