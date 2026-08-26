<script setup>
const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <article class="weather-card" @click="emit('select-card', props.city)">
    <div class="weather-card-topline">
      <strong>{{ props.city.name }}</strong>
      <span class="weather-icon" aria-hidden="true">{{ props.city.emoji }}</span>
    </div>

    <div class="weather-temperature">
      <strong>{{ props.city.temp }}°</strong>
      <span>{{ props.city.status }}</span>
    </div>

    <p v-if="props.city.temp >= 25" class="temperature-label hot">🔥 더움 (25도 이상)</p>
    <p v-else class="temperature-label cool">❄️ 선선함 (25도 미만)</p>

    <div class="weather-stats">
      <span>습도 {{ props.city.humidity }}%</span>
      <span>바람 {{ props.city.wind }}m/s</span>
    </div>

    <p class="weather-recommendation">오늘의 추천: {{ props.city.recommendation }}</p>

    <button type="button" @click.stop="emit('click-detail', props.city)">상세보기</button>
  </article>
</template>

<style scoped>
.weather-card {
  display: flex;
  min-height: 250px;
  flex-direction: column;
  padding: 1.3rem;
  border-radius: 1.1rem;
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

.weather-card-topline strong {
  font-size: 1.15rem;
}

.weather-icon {
  font-size: 2.1rem;
}

.weather-temperature {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-top: 1.6rem;
}

.weather-temperature strong {
  font-size: 3.3rem;
  font-weight: 300;
  letter-spacing: -0.08em;
}

.weather-temperature span,
.weather-stats {
  color: rgb(247 251 255 / 68%);
}

.temperature-label {
  width: fit-content;
  margin: 0.5rem 0;
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
  padding: 0.85rem 0;
  border-top: 1px solid rgb(255 255 255 / 12%);
  font-size: 0.74rem;
}

.weather-recommendation {
  margin-bottom: 0.8rem;
  color: #bcecff;
  font-size: 0.78rem;
  font-weight: 600;
}

.weather-card button {
  padding: 0.65rem;
  border: 0;
  border-radius: 0.55rem;
  color: #153047;
  background: #bcecff;
  font-weight: 700;
  cursor: pointer;
}
</style>
