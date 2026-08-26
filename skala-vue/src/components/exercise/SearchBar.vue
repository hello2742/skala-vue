<script setup>
const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])

const updateQuery = (event) => {
  emit('update-query', event.target.value)
}
</script>

<template>
  <label class="search-bar">
    <span class="sr-only">도시 검색</span>
    <span aria-hidden="true">⌕</span>
    <input :value="props.searchQuery" type="text" placeholder="도시 이름 검색" @input="updateQuery" />
  </label>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid #cfdee5;
  border-radius: 0.65rem;
  color: #78909c;
  background: white;
}

.search-bar input {
  width: 100%;
  border: 0;
  outline: 0;
  color: #153047;
  background: transparent;
  font-size: 0.85rem;
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
</style>
