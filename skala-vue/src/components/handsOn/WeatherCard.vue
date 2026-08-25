<script setup>
defineProps({
  city: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select', 'show-detail'])
</script>

<template>
  <article class="weather-card" @click="emit('select', city.name)">
    <div class="weather-card-topline">
      <span class="weather-city">{{ city.name }}</span>
      <span class="weather-icon" aria-hidden="true">{{ city.emoji }}</span>
    </div>

    <div class="weather-temperature">
      <strong>{{ city.temp }}°</strong>
      <span>{{ city.status }}</span>
    </div>

    <p v-if="city.temp >= 25" class="temperature-label hot">🔥 더움 (25도 이상)</p>
    <p v-else class="temperature-label cool">❄️ 선선함 (25도 미만)</p>

    <div class="weather-stats">
      <span>습도 {{ city.humidity }}%</span>
      <span>바람 {{ city.wind }}m/s</span>
    </div>

    <button class="detail-button" type="button" @click.stop="emit('show-detail', city.name, city.status)">
      상세보기
    </button>
  </article>
</template>

<style scoped>
.weather-card {
  display: flex;
  min-height: 275px;
  flex-direction: column;
  padding: 1.4rem;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: 1.2rem;
  color: #f7fbff;
  background: linear-gradient(145deg, #1a3348, #102231);
  box-shadow: 0 12px 30px rgb(15 35 50 / 14%);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.weather-card:hover {
  box-shadow: 0 18px 36px rgb(15 35 50 / 22%);
  transform: translateY(-5px);
}

.weather-card-topline,
.weather-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.weather-city {
  font-size: 1.15rem;
  font-weight: 700;
}

.weather-icon {
  font-size: 2.2rem;
}

.weather-temperature {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-top: 1.8rem;
}

.weather-temperature strong {
  font-size: 3.5rem;
  font-weight: 300;
  letter-spacing: -0.08em;
}

.weather-temperature span {
  color: rgb(247 251 255 / 65%);
}

.temperature-label {
  width: fit-content;
  margin-top: 0.5rem;
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
}

.temperature-label.hot {
  color: #ffcf8a;
  background: rgb(255 166 77 / 15%);
}

.temperature-label.cool {
  color: #9ed9ff;
  background: rgb(117 194 255 / 15%);
}

.weather-stats {
  margin-top: auto;
  padding: 0.9rem 0;
  border-top: 1px solid rgb(255 255 255 / 12%);
  color: rgb(247 251 255 / 65%);
  font-size: 0.75rem;
}

.detail-button {
  padding: 0.65rem;
  border: 0;
  border-radius: 0.55rem;
  color: #153047;
  background: #bcecff;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;
}

.detail-button:hover {
  background: #e0f8ff;
}
</style>
