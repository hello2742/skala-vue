import { computed, ref, watch, watchEffect } from 'vue'
import { weatherMockData } from '../data/weatherMock'

export function useWeatherWatch() {
  // [요구사항 1] 검색어, 선택 도시, 날씨 목록을 반응형 상태로 정의합니다.
  const searchQuery = ref('')
  const selectedCityInfo = ref(null)
  const weatherList = ref(weatherMockData.map((city) => ({ ...city })))

  // [요구사항 5] 나만의 반응형 상태: 야외활동 추천 도시만 보는 필터입니다.
  const showRecommendedOnly = ref(false)

  // [요구사항 2] 검색어가 도시 이름에 포함된 날씨 목록을 computed로 계산합니다.
  const filteredWeatherList = computed(() => {
    return weatherList.value.filter((city) => city.name.includes(searchQuery.value))
  })

  // [요구사항 4] 검색어가 비어 있으면 원본 목록, 입력하면 computed 검색 결과를 사용합니다.
  // [요구사항 5] 추천 필터가 켜지면 맑거나 구름인 따뜻한 도시만 보여줍니다.
  const displayWeatherList = computed(() => {
    const list = searchQuery.value ? filteredWeatherList.value : weatherList.value

    if (!showRecommendedOnly.value) {
      return list
    }

    return list.filter((city) => city.temp >= 25 && city.status !== '비')
  })

  // [요구사항 5] 나만의 computed: 현재 데이터에서 가장 따뜻한 추천 도시를 계산합니다.
  const recommendedCity = computed(() => {
    return weatherList.value
      .filter((city) => city.status !== '비')
      .sort((firstCity, secondCity) => secondCity.temp - firstCity.temp)[0]
  })

  const selectedMessage = computed(() => {
    if (!selectedCityInfo.value) {
      return '지역 카드를 눌러 선택해 보세요.'
    }

    return `${selectedCityInfo.value.name}이 선택되었습니다.`
  })

  // [요구사항 3] selectedCityInfo가 바뀔 때마다 이전 값과 새 값을 콘솔에 기록합니다.
  watch(selectedCityInfo, (newCity, oldCity) => {
    console.log('[watch] selectedCityInfo 변경:', {
      이전도시: oldCity?.name ?? '없음',
      선택도시: newCity?.name ?? '없음',
    })
  })

  // [요구사항 3] 검색어를 타이핑할 때마다 searchQuery 변화를 추적합니다.
  watchEffect(() => {
    console.log('[watchEffect] 현재 검색어:', searchQuery.value)
  })

  // [요구사항 5] 나만의 watcher: 추천 필터가 켜지고 꺼지는 시점을 기록합니다.
  watch(showRecommendedOnly, (isEnabled) => {
    console.log('[watch] 추천 도시 필터:', isEnabled ? '활성화' : '비활성화')
  })

  const searchCity = (event) => {
    searchQuery.value = event.target.value
  }

  const selectCity = (cityName) => {
    selectedCityInfo.value = weatherList.value.find((city) => city.name === cityName) ?? null
  }

  const showDetail = (cityName, status) => {
    window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
  }

  return {
    searchQuery,
    selectedCityInfo,
    weatherList,
    filteredWeatherList,
    displayWeatherList,
    recommendedCity,
    selectedMessage,
    showRecommendedOnly,
    searchCity,
    selectCity,
    showDetail,
  }
}
