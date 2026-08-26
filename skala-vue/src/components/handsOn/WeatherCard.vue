<script setup>
const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
})

// [Props] 부모가 전달한 선택 도시 객체를 카드로 표시합니다.
const emit = defineEmits(['select-card', 'click-detail'])

// [Emits] 카드 선택 시 도시 객체 전체를 부모에게 전달합니다.
const selectCard = () => {
  emit('select-card', props.city)
}

// [Emits] 상세보기 버튼 클릭 시 도시 객체를 부모에게 전달합니다.
const clickDetail = () => {
  emit('click-detail', props.city)
}
</script>

<template>
  <!-- [Emits] 카드 선택 이벤트를 부모 컴포넌트로 전달합니다. -->
  <article class="weather-card" @click="selectCard">
    <div class="weather-card-topline">
      <span class="weather-city">{{ props.city.name }}</span>
      <span class="weather-icon" aria-hidden="true">{{ props.city.emoji }}</span>
    </div>

    <div class="weather-temperature">
      <strong>{{ props.city.temp }}°</strong>
      <span>{{ props.city.status }}</span>
    </div>

    <!-- [요구사항 2] 기온이 25도 이상이면 더움 라벨을 표시합니다. -->
    <p v-if="props.city.temp >= 25" class="temperature-label hot">🔥 더움 (25도 이상)</p>
    <!-- [요구사항 2] 기온이 25도 미만이면 선선함 라벨을 표시합니다. -->
    <p v-else class="temperature-label cool">❄️ 선선함 (25도 미만)</p>

    <div class="weather-stats">
      <span>습도 {{ props.city.humidity }}%</span>
      <span>바람 {{ props.city.wind }}m/s</span>
    </div>

    <!-- [요구사항 5] 나만의 목업 데이터인 체감온도와 미세먼지를 추가로 표시합니다. -->
    <div class="weather-extra">
      <span>체감 {{ props.city.feelsLike }}°</span>
      <span>미세먼지 {{ props.city.airQuality }}</span>
    </div>

    <!-- [요구사항 5] 날씨 데이터에 따른 추천 활동을 보여주는 확장 Mockup입니다. -->
    <p class="weather-recommendation">오늘의 추천: {{ props.city.recommendation }}</p>

    <!-- [Emits] .stop으로 카드 선택 이벤트 버블링을 막고 상세 이벤트만 전달합니다. -->
    <button class="detail-button" type="button" @click.stop="clickDetail">
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

.weather-extra {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.6rem;
  color: rgb(247 251 255 / 80%);
  font-size: 0.73rem;
}

.weather-recommendation {
  margin-bottom: 0.9rem;
  color: #bcecff;
  font-size: 0.78rem;
  font-weight: 600;
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
  margin-bottom: 0.5rem;
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
