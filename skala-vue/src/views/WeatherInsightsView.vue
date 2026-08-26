<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { weatherMockData } from '../data/weatherMock'

const hottestCity = computed(() => [...weatherMockData].sort((firstCity, secondCity) => secondCity.temp - firstCity.temp)[0])
const bestAirCity = computed(() => weatherMockData.find((city) => city.airQuality === '매우 좋음') ?? weatherMockData[0])
const averageTemperature = computed(() => {
  const total = weatherMockData.reduce((sum, city) => sum + city.temp, 0)
  return Math.round((total / weatherMockData.length) * 10) / 10
})
</script>

<template>
  <main class="insights-view">
    <header class="insights-header">
      <p class="eyebrow">WEATHER INSIGHTS</p>
      <h1>오늘의 날씨 인사이트</h1>
      <p>목업 데이터를 computed로 가공해 만든 추가 View입니다.</p>
    </header>

    <section class="insight-grid">
      <article class="insight-card">
        <span>평균 기온</span>
        <strong>{{ averageTemperature }}°</strong>
      </article>
      <article class="insight-card accent">
        <span>가장 더운 도시</span>
        <strong>{{ hottestCity.name }} · {{ hottestCity.temp }}°</strong>
      </article>
      <article class="insight-card">
        <span>공기질 추천</span>
        <strong>{{ bestAirCity.name }}</strong>
        <small>{{ bestAirCity.airQuality }}</small>
      </article>
    </section>

    <RouterLink class="insights-link" to="/">메인 대시보드로 돌아가기</RouterLink>
  </main>
</template>

<style scoped>
.insights-view {
  width: min(1000px, calc(100% - 32px));
  margin: 0 auto;
  padding: 5rem 0;
}

.insights-header h1 {
  color: var(--color-heading);
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.07em;
}

.insights-header > p:last-child {
  margin-top: 0.8rem;
  color: var(--color-text-muted);
}

.insight-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2.5rem;
}

.insight-card {
  min-height: 170px;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background: var(--color-background-soft);
}

.insight-card span,
.insight-card small {
  display: block;
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.insight-card strong {
  display: block;
  margin-top: 2rem;
  color: var(--color-heading);
  font-size: 1.45rem;
}

.insight-card small {
  margin-top: 0.35rem;
}

.insight-card.accent {
  border-color: #b8dcd4;
  background: #ddf4ed;
}

.insights-link {
  display: inline-block;
  margin-top: 2rem;
  color: var(--color-accent);
  font-weight: 700;
}

@media (max-width: 650px) {
  .insight-grid {
    grid-template-columns: 1fr;
  }
}
</style>
