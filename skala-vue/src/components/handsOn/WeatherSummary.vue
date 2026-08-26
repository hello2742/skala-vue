<script setup>
defineProps({
  city: {
    type: Object,
    required: true,
  },
  resultCount: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <aside class="weather-summary">
    <span class="summary-label">MY WEATHER MOCKUP</span>
    <strong>{{ city.name }} 추천</strong>
    <p>{{ city.recommendation }} · 체감 {{ city.feelsLike }}° · 미세먼지 {{ city.airQuality }}</p>
    <small>현재 검색 결과 {{ resultCount }}개</small>
  </aside>
</template>

<style scoped>
.weather-summary {
  padding: 1rem 1.2rem;
  border-radius: 0.9rem;
  color: #214c56;
  background: #dff5ed;
}

.summary-label {
  display: block;
  color: #168b72;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.weather-summary strong {
  display: block;
  margin-top: 0.25rem;
  color: #153047;
  font-size: 1.2rem;
}

.weather-summary p {
  margin-top: 0.25rem;
  font-size: 0.82rem;
}

.weather-summary small {
  display: block;
  margin-top: 0.65rem;
  color: #5c8580;
  font-size: 0.72rem;
}
</style>
