<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import { useWeatherApi } from '../composables/useWeatherApi'
import { cityCatalog } from '../data/cityCatalog'

const router = useRouter()
const weatherList = ref([])
const searchQuery = ref('')
const selectedCityInfo = ref(null)
const { isLoading, errorMessage, fetchWeatherList } = useWeatherApi()

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((city) => city.name.includes(searchQuery.value))
})

const selectedMessage = computed(() => {
  return selectedCityInfo.value ? `${selectedCityInfo.value.name}이 선택되었습니다.` : ''
})

const updateQuery = (query) => {
  searchQuery.value = query
}

const selectCard = (city) => {
  selectedCityInfo.value = city
}

// [요구사항] 상세보기는 alert 대신 Programmatic Navigation으로 상세 View로 이동합니다.
const clickDetail = (city) => {
  router.push(`/weather/${city.id}`)
}

watch(selectedCityInfo, (newCity) => {
  console.log('[watch] 선택 도시 변경:', newCity?.name ?? '없음')
})

watchEffect(() => {
  console.log('[watchEffect] 검색어:', searchQuery.value)
})

// [과제 요구사항 1] OpenWeatherMap API에서 지역별 실시간 날씨를 가져옵니다.
onMounted(async () => {
  weatherList.value = await fetchWeatherList(cityCatalog)
})
</script>

<template>
  <main class="weather-home-view">
    <header class="weather-home-header">
      <div>
        <p class="eyebrow">WEATHER ROUTER APP</p>
        <h1>오늘의 지역별<br /><span>날씨 현황</span></h1>
        <p>도시를 선택하고 상세 기상관측 페이지로 이동해 보세요.</p>
      </div>
    </header>

    <div v-if="selectedMessage" class="home-status" aria-live="polite">
      <span aria-hidden="true"></span>
      {{ selectedMessage }}
    </div>

    <BaseDashboardCard title="지역별 날씨 현황" :loading="isLoading">
      <template #header-actions>
        <div class="weather-card-actions">
          <div class="home-highlight">
            <strong>{{ weatherList.length }}</strong>
            <span>개 지역 관측 중</span>
          </div>
          <SearchBar :search-query="searchQuery" @update-query="updateQuery" />
        </div>
      </template>

      <el-alert v-if="errorMessage" class="weather-api-alert" type="warning" :closable="false" show-icon>
        {{ errorMessage }}
      </el-alert>

      <div v-if="filteredWeatherList.length" class="weather-home-grid">
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city="city"
          @select-card="selectCard"
          @click-detail="clickDetail"
        />
      </div>
      <p v-else-if="!isLoading" class="weather-home-empty">
        {{ errorMessage ? '실시간 날씨 데이터를 불러오지 못했습니다.' : '검색 결과와 일치하는 도시가 없습니다.' }}
      </p>
    </BaseDashboardCard>
  </main>
</template>

<style scoped>
.weather-home-view {
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 2.5rem 0 5rem;
}

.weather-home-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1.25rem;
}

.weather-home-header h1 {
  color: var(--color-heading);
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 800;
  letter-spacing: -0.07em;
  line-height: 1.08;
}

.weather-home-header h1 span {
  color: var(--color-accent);
}

.weather-home-header > div:first-child > p:last-child {
  margin-top: 0.75rem;
  color: var(--color-text-muted);
}

.home-highlight {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-shrink: 0;
  padding: 0.45rem 0.7rem;
  border: 1px solid #c9e4de;
  border-radius: 0.9rem;
  color: #32616c;
  background: #ddf4ed;
}

.home-highlight strong {
  color: #168b72;
  font-size: 1.15rem;
}

.home-highlight span {
  font-size: 0.68rem;
}

.weather-card-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.weather-card-actions :deep(.search-bar) {
  width: 190px;
  padding: 0.55rem 0.7rem;
}

.home-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding: 0.6rem 0.9rem;
  border-radius: 0.65rem;
  color: #32616c;
  background: #d9f3f0;
  font-size: 0.85rem;
  font-weight: 600;
}

.home-status span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #22a68a;
}

.weather-home-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.weather-home-empty {
  padding: 3rem 0;
  color: var(--color-text-muted);
  text-align: center;
}

.weather-api-message {
  margin-bottom: 1rem;
  color: var(--color-text-muted);
  font-size: 0.82rem;
}

.weather-api-warning {
  color: #a35d24;
}

@media (max-width: 950px) {
  .weather-home-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 650px) {
  .weather-home-view {
    width: calc(100% - 32px);
    padding-top: 2.5rem;
  }

  .weather-home-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .weather-card-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .weather-card-actions :deep(.search-bar) {
    width: 100%;
  }

  .weather-home-grid {
    grid-template-columns: 1fr;
  }
}
</style>
