<script setup>
import WeatherCard from './WeatherCard.vue'
import { useWeatherWatch } from '../../composables/useWeatherWatch'

const {
  searchQuery,
  displayWeatherList,
  recommendedCity,
  selectedMessage,
  showRecommendedOnly,
  searchCity,
  selectCity,
  showDetail,
} = useWeatherWatch()
</script>

<template>
  <section class="weather-watch-dashboard">
    <header class="watch-header">
      <div>
        <p class="watch-kicker">WATCH & COMPUTED LAB</p>
        <h2>날씨 검색 상태 실험실</h2>
        <p class="watch-description">검색과 선택 상태의 변화를 브라우저 콘솔에서 확인해 보세요.</p>
      </div>
      <div class="recommended-city">
        <span>오늘의 추천 도시</span>
        <strong>{{ recommendedCity.name }}</strong>
      </div>
    </header>

    <div class="watch-controls">
      <!-- [요구사항 4] 검색어가 비어 있으면 원본 목록, 입력하면 filteredWeatherList를 출력합니다. -->
      <label class="watch-search-box">
        <span class="sr-only">도시 검색</span>
        <span aria-hidden="true">⌕</span>
        <input :value="searchQuery" type="text" placeholder="도시 이름 검색" @input="searchCity" />
      </label>

      <!-- [요구사항 5] 추가한 반응형 상태를 토글해 추천 도시만 필터링합니다. -->
      <button
        class="recommend-button"
        :class="{ active: showRecommendedOnly }"
        type="button"
        @click="showRecommendedOnly = !showRecommendedOnly"
      >
        {{ showRecommendedOnly ? '전체 도시 보기' : '야외활동 추천만 보기' }}
      </button>
    </div>

    <div class="watch-status" aria-live="polite">
      <span class="status-dot" aria-hidden="true"></span>
      {{ selectedMessage }}
    </div>

    <!-- [요구사항 3] selectedCityInfo와 searchQuery의 watcher 로그는 브라우저 콘솔에서 확인합니다. -->
    <p class="console-hint">개발자 도구 Console에서 watch와 watchEffect 로그를 확인할 수 있습니다.</p>

    <!-- [요구사항 4] 검색 결과가 있으면 도시 카드를 출력합니다. -->
    <div v-if="displayWeatherList.length" class="weather-watch-grid">
      <WeatherCard
        v-for="city in displayWeatherList"
        :key="city.id"
        :city="city"
        @select-card="selectCity"
        @click-detail="showDetail"
      />
    </div>

    <!-- [요구사항 4] 검색어와 일치하는 도시가 없을 때 안내 문구를 출력합니다. -->
    <p v-else-if="searchQuery" class="watch-empty">검색 결과와 일치하는 도시가 없습니다.</p>
    <p v-else class="watch-empty">현재 조건에 맞는 추천 도시가 없습니다.</p>
  </section>
</template>

<style scoped>
.weather-watch-dashboard {
  padding: 1.5rem;
  border-radius: 1.4rem;
  background: #eef7f6;
}

.watch-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.watch-kicker {
  margin-bottom: 0.3rem;
  color: #168b9c;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.watch-header h2 {
  color: #153047;
  font-size: 1.7rem;
  font-weight: 800;
}

.watch-description {
  margin-top: 0.45rem;
  color: #6c858f;
  font-size: 0.82rem;
}

.recommended-city {
  min-width: 145px;
  padding: 0.8rem 1rem;
  border: 1px solid #c9e4de;
  border-radius: 0.8rem;
  color: #32616c;
  background: #ddf4ed;
  text-align: right;
}

.recommended-city span,
.recommended-city strong {
  display: block;
}

.recommended-city span {
  font-size: 0.68rem;
}

.recommended-city strong {
  margin-top: 0.2rem;
  color: #168b72;
  font-size: 1.1rem;
}

.watch-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.watch-search-box {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 0.85rem;
  border: 1px solid #cfdee5;
  border-radius: 0.65rem;
  color: #78909c;
  background: white;
}

.watch-search-box input {
  width: 100%;
  border: 0;
  outline: 0;
  color: #153047;
  background: transparent;
  font-size: 0.8rem;
}

.recommend-button {
  padding: 0.72rem 0.9rem;
  border: 1px solid #b8dcd4;
  border-radius: 0.65rem;
  color: #168b72;
  background: white;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
}

.recommend-button.active {
  color: white;
  background: #168b72;
}

.watch-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.65rem;
  color: #32616c;
  background: #d9f3f0;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #22a68a;
}

.console-hint {
  margin-bottom: 1.2rem;
  color: #78909c;
  font-size: 0.72rem;
}

.weather-watch-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.watch-empty {
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
  .weather-watch-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 580px) {
  .weather-watch-dashboard {
    padding: 1rem;
  }

  .watch-header {
    flex-direction: column;
  }

  .recommended-city {
    width: 100%;
    text-align: left;
  }

  .watch-controls {
    align-items: stretch;
    flex-direction: column;
  }

  .weather-watch-grid {
    grid-template-columns: 1fr;
  }
}
</style>
