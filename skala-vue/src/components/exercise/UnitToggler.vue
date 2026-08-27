<script setup>
import { useConfigStore } from '../../stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler" aria-label="온도 단위 설정">
    <span class="unit-label">{{ configStore.unitLabel }}</span>
    <button type="button" @click="configStore.toggleUnit">
      {{ configStore.unitSymbol }} 전환
    </button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.unit-label {
  color: var(--color-text-muted);
  font-size: 0.78rem;
}

.unit-toggler button {
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: 0.55rem;
  color: var(--color-accent);
  background: var(--color-background-soft);
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
}

.unit-toggler button:hover {
  border-color: var(--color-accent);
}
</style>
