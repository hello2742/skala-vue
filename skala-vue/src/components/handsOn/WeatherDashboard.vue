<script setup>
import WeatherCard from './WeatherCard.vue'
import { useWeather } from '../../composables/useWeather'

const { searchKeyword, selectedMessage, filteredWeatherList, searchCity, selectCity, showDetail } = useWeather()
</script>

<template>
  <section class="weather-dashboard">
    <div class="dashboard-toolbar">
      <div>
        <p class="dashboard-kicker">TODAY'S WEATHER</p>
        <h2>지역별 날씨 현황</h2>
      </div>
      <!-- [요구사항 3] :value와 @input을 사용한 한글 도시 검색 input입니다. -->
      <label class="search-box">
        <span class="sr-only">도시 검색</span>
        <span aria-hidden="true">⌕</span>
        <input :value="searchKeyword" type="text" placeholder="도시 이름 검색" @input="searchCity" />
      </label>
    </div>

    <div class="selection-bar" aria-live="polite">
      <span class="selection-dot" aria-hidden="true"></span>
      {{ selectedMessage }}
    </div>

    <!-- [요구사항 1] 날씨 배열을 v-for로 반복 출력하고 id를 :key로 사용합니다. -->
    <div v-if="filteredWeatherList.length" class="weather-grid">
      <WeatherCard
        v-for="city in filteredWeatherList"
        :key="city.id"
        :city="city"
        @select="selectCity"
        @show-detail="showDetail"
      />
    </div>
    <p v-else class="no-result">검색 결과가 없습니다.</p>
  </section>
</template>

<style scoped>
.weather-dashboard {
  padding: 1.5rem;
  border-radius: 1.4rem;
  background: #edf5f8;
}

.dashboard-toolbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.dashboard-kicker {
  margin-bottom: 0.3rem;
  color: #168b9c;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.dashboard-toolbar h2 {
  color: #153047;
  font-size: 1.7rem;
  font-weight: 800;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 210px;
  padding: 0.7rem 0.85rem;
  border: 1px solid #cfdee5;
  border-radius: 0.65rem;
  color: #78909c;
  background: white;
}

.search-box input {
  width: 100%;
  border: 0;
  outline: 0;
  color: #153047;
  background: transparent;
  font-size: 0.8rem;
}

.selection-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
  border-radius: 0.65rem;
  color: #32616c;
  background: #d9f3f0;
  font-size: 0.85rem;
  font-weight: 600;
}

.selection-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #22a68a;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.no-result {
  padding: 3rem 0;
  color: #6c858f;
  text-align: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 950px) {
  .weather-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 580px) {
  .weather-dashboard {
    padding: 1rem;
  }

  .dashboard-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }

  .weather-grid {
    grid-template-columns: 1fr;
  }
}
</style>
