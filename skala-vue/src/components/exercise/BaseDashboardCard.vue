<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section class="dashboard-card" :class="{ compact: props.compact }">
    <div class="dashboard-card-heading">
      <div>
        <span>WEATHER DASHBOARD</span>
        <h2>{{ title }}</h2>
      </div>
      <slot name="header-actions"></slot>
    </div>
    <div class="dashboard-card-body" v-loading="props.loading">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
.dashboard-card {
  padding: 1.5rem;
  border: 1px solid #d8e7eb;
  border-radius: 1.2rem;
  background: #f8fcfc;
}

.dashboard-card.compact {
  padding: 1rem 1.2rem;
}

.dashboard-card + .dashboard-card {
  margin-top: 1rem;
}

.dashboard-card-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.dashboard-card.compact .dashboard-card-heading {
  margin-bottom: 0.6rem;
}

.dashboard-card-heading span {
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

@media (max-width: 650px) {
  .dashboard-card-heading {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
