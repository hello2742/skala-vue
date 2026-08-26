<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import WeatherSummary from './WeatherSummary.vue'
import { weatherMockData } from '../../data/weatherMock'

// [요구사항 1] 모든 반응형 데이터는 부모 컴포넌트에서 관리합니다.
const weatherList = ref(weatherMockData.map((city) => ({ ...city })))
const searchQuery = ref('')
const selectedCityInfo = ref(null)

// [기존 기능 유지] 나만의 추천 도시 필터 상태입니다.
const showRecommendedOnly = ref(false)

// [검색 기능] 검색어가 도시 이름에 포함된 결과를 계산합니다.
const filteredWeatherList = computed(() => {
  return weatherList.value.filter((city) => city.name.includes(searchQuery.value))
})

// 검색어가 없으면 원본 목록을 사용하고, 검색어가 있으면 computed 결과를 사용합니다.
const displayWeatherList = computed(() => {
  const list = searchQuery.value ? filteredWeatherList.value : weatherList.value

  if (!showRecommendedOnly.value) {
    return list
  }

  return list.filter((city) => city.temp >= 25 && city.status !== '비')
})

const recommendedCity = computed(() => {
  return weatherList.value
    .filter((city) => city.status !== '비')
    .sort((firstCity, secondCity) => secondCity.temp - firstCity.temp)[0]
})

const selectedMessage = computed(() => {
  return selectedCityInfo.value ? `${selectedCityInfo.value.name}이 선택되었습니다.` : '지역 카드를 눌러 선택해 보세요.'
})

// [watch] 선택된 도시가 바뀔 때마다 이전 값과 새 값을 기록합니다.
watch(selectedCityInfo, (newCity, oldCity) => {
  console.log('[watch] selectedCityInfo 변경:', {
    이전도시: oldCity?.name ?? '없음',
    선택도시: newCity?.name ?? '없음',
  })
})

// [watchEffect] 사용자가 검색어를 입력할 때마다 변화를 추적합니다.
watchEffect(() => {
  console.log('[watchEffect] 현재 검색어:', searchQuery.value)
})

// [나만의 watcher] 추천 도시 필터의 상태 변화도 기록합니다.
watch(showRecommendedOnly, (isEnabled) => {
  console.log('[watch] 추천 도시 필터:', isEnabled ? '활성화' : '비활성화')
})

// [Emits 수신] SearchBar가 보낸 검색어를 부모 상태에 반영합니다.
const updateQuery = (query) => {
  searchQuery.value = query
}

// [Emits 수신] WeatherCard가 보낸 선택 도시 객체를 부모 상태에 저장합니다.
const selectCard = (city) => {
  selectedCityInfo.value = city
}

// [Emits 수신] WeatherCard가 보낸 도시 객체로 상세 알림을 표시합니다.
const clickDetail = (city) => {
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
}
</script>

<template>
  <section class="weather-parent">
    <header class="weather-parent-header">
      <div>
        <p class="weather-parent-kicker">COMPONENT & SLOT LAB</p>
        <h2>컴포넌트로 분리한 날씨 대시보드</h2>
        <p>Props, Emits, Slot을 사용해 화면과 데이터 흐름을 분리했습니다.</p>
      </div>
      <WeatherSummary :city="recommendedCity" :result-count="displayWeatherList.length" />
    </header>

    <div class="parent-status" aria-live="polite">
      <span aria-hidden="true"></span>
      {{ selectedMessage }}
    </div>

    <!-- BaseDashboardCard 내부에 SearchBar를 부모 스코프에서 주입합니다. -->
    <BaseDashboardCard title="도시 검색">
      <SearchBar :search-query="searchQuery" @update-query="updateQuery" />
    </BaseDashboardCard>

    <!-- BaseDashboardCard 내부에 WeatherCard 목록을 부모 스코프에서 주입합니다. -->
    <BaseDashboardCard title="지역별 날씨 현황">
      <div class="weather-parent-tools">
        <p>현재 {{ displayWeatherList.length }}개 도시 표시 중</p>
        <button type="button" @click="showRecommendedOnly = !showRecommendedOnly">
          {{ showRecommendedOnly ? '전체 도시 보기' : '추천 도시만 보기' }}
        </button>
      </div>

      <div v-if="displayWeatherList.length" class="weather-parent-grid">
        <WeatherCard
          v-for="city in displayWeatherList"
          :key="city.id"
          :city="city"
          @select-card="selectCard"
          @click-detail="clickDetail"
        />
      </div>
      <p v-else class="weather-parent-empty">
        {{ searchQuery ? '검색 결과와 일치하는 도시가 없습니다.' : '추천 조건에 맞는 도시가 없습니다.' }}
      </p>
    </BaseDashboardCard>
  </section>
</template>

<style scoped>
.weather-parent {
  padding: 1.5rem;
  border-radius: 1.4rem;
  background: #eef7f6;
}

.weather-parent-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.weather-parent-kicker {
  margin-bottom: 0.3rem;
  color: #168b9c;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.weather-parent-header h2 {
  color: #153047;
  font-size: 1.7rem;
  font-weight: 800;
}

.weather-parent-header p:last-child {
  margin-top: 0.45rem;
  color: #6c858f;
  font-size: 0.82rem;
}

.parent-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  border-radius: 0.65rem;
  color: #32616c;
  background: #d9f3f0;
  font-size: 0.85rem;
  font-weight: 600;
}

.parent-status span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #22a68a;
}

.weather-parent-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #6c858f;
  font-size: 0.78rem;
}

.weather-parent-tools button {
  padding: 0.6rem 0.75rem;
  border: 1px solid #b8dcd4;
  border-radius: 0.55rem;
  color: #168b72;
  background: white;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
}

.weather-parent-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.weather-parent-empty {
  padding: 3rem 0;
  color: #6c858f;
  text-align: center;
}

@media (max-width: 950px) {
  .weather-parent-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 650px) {
  .weather-parent {
    padding: 1rem;
  }

  .weather-parent-header {
    flex-direction: column;
  }

  .weather-parent-grid {
    grid-template-columns: 1fr;
  }
}
</style>
