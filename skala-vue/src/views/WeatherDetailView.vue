<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { weatherMockData } from '../data/weatherMock'
import { useTemperature } from '../composables/useTemperature'

const route = useRoute()
const cityInfo = ref(null)
const { displayTemp, unitSymbol } = useTemperature(() => cityInfo.value?.temp ?? 0)

// [요구사항] Mount 시점에 동적 경로의 cityId로 Mock Data에서 도시를 선택합니다.
onMounted(() => {
  cityInfo.value = weatherMockData.find((city) => city.id === route.params.cityId) ?? null
})
</script>

<template>
  <main class="weather-detail-view">
    <RouterLink class="detail-back-link" to="/">← 날씨 홈으로</RouterLink>

    <section v-if="cityInfo" class="detail-card">
      <p class="eyebrow">WEATHER DETAIL · {{ cityInfo.id }}</p>
      <div class="detail-title-row">
        <div>
          <h1>{{ cityInfo.name }}</h1>
          <p>{{ cityInfo.status }} · 오늘의 지역별 기상관측</p>
        </div>
        <span class="detail-icon" aria-hidden="true">{{ cityInfo.emoji }}</span>
      </div>

      <div class="detail-temperature">
        <strong>{{ displayTemp }}{{ unitSymbol }}</strong>
        <span>체감 {{ cityInfo.feelsLike }}{{ unitSymbol }}</span>
      </div>

      <dl class="detail-stats">
        <div><dt>습도</dt><dd>{{ cityInfo.humidity }}%</dd></div>
        <div><dt>풍속</dt><dd>{{ cityInfo.wind }}m/s</dd></div>
        <div><dt>미세먼지</dt><dd>{{ cityInfo.airQuality }}</dd></div>
        <div><dt>추천 활동</dt><dd>{{ cityInfo.recommendation }}</dd></div>
      </dl>
    </section>

    <section v-else class="detail-card detail-not-found">
      <h1>도시 정보를 찾을 수 없습니다.</h1>
      <p>유효하지 않은 도시 코드입니다.</p>
    </section>
  </main>
</template>

<style scoped>
.weather-detail-view {
  width: min(760px, calc(100% - 32px));
  margin: 0 auto;
  padding: 5rem 0;
}

.detail-back-link {
  color: var(--color-accent);
  font-size: 0.85rem;
  font-weight: 700;
}

.detail-card {
  margin-top: 1.5rem;
  padding: 2rem;
  border-radius: 1.4rem;
  color: #f7fbff;
  background: linear-gradient(145deg, #1a3348, #102231);
  box-shadow: 0 20px 50px rgb(15 35 50 / 18%);
}

.detail-card .eyebrow {
  color: #9ed9ff;
}

.detail-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}

.detail-title-row h1 {
  color: white;
  font-size: 3rem;
  font-weight: 800;
}

.detail-title-row p {
  margin-top: 0.4rem;
  color: rgb(247 251 255 / 65%);
}

.detail-icon {
  font-size: 4rem;
}

.detail-temperature {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin: 3rem 0;
}

.detail-temperature strong {
  font-size: 6rem;
  font-weight: 200;
  letter-spacing: -0.1em;
}

.detail-temperature span {
  color: #bcecff;
}

.detail-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  overflow: hidden;
  border-radius: 0.8rem;
  background: rgb(255 255 255 / 12%);
}

.detail-stats div {
  padding: 1rem;
  background: rgb(255 255 255 / 7%);
}

.detail-stats dt {
  color: rgb(247 251 255 / 58%);
  font-size: 0.75rem;
}

.detail-stats dd {
  margin-top: 0.35rem;
  font-size: 1rem;
  font-weight: 700;
}

.detail-not-found {
  color: white;
  text-align: center;
}

.detail-not-found p {
  margin-top: 0.6rem;
  color: rgb(247 251 255 / 65%);
}

@media (max-width: 520px) {
  .weather-detail-view {
    padding-top: 2.5rem;
  }

  .detail-card {
    padding: 1.3rem;
  }

  .detail-title-row h1 {
    font-size: 2.2rem;
  }

  .detail-temperature strong {
    font-size: 4.5rem;
  }
}
</style>
