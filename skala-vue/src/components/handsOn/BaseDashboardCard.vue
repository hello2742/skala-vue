<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="dashboard-card">
    <div class="dashboard-card-heading">
      <span class="dashboard-card-kicker">WEATHER DASHBOARD</span>
      <h2>{{ title }}</h2>
    </div>

    <!-- 부모가 SearchBar 또는 WeatherCard를 주입하는 공통 Slot 영역입니다. -->
    <slot></slot>
  </section>
</template>

<style scoped>
.dashboard-card {
  padding: 1.5rem;
  border: 1px solid #d8e7eb;
  border-radius: 1.2rem;
  background: #f8fcfc;
}

.dashboard-card + .dashboard-card {
  margin-top: 1rem;
}

.dashboard-card-heading {
  margin-bottom: 1rem;
}

.dashboard-card-kicker {
  color: #168b9c;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.dashboard-card-heading h2 {
  margin-top: 0.3rem;
  color: #153047;
  font-size: 1.35rem;
  font-weight: 800;
}
</style>
