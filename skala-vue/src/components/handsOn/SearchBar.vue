<script setup>
// [Props] 부모의 검색어를 받아 input에 표시합니다.
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

// [Emits] input 값이 바뀌면 update-query 이벤트로 부모에게 전달합니다.
const emit = defineEmits(['update-query'])

const updateQuery = (event) => {
  emit('update-query', event.target.value)
}
</script>

<template>
  <label class="search-bar">
    <span class="sr-only">도시 검색</span>
    <span aria-hidden="true">⌕</span>
    <input :value="searchQuery" type="text" placeholder="도시 이름 검색" @input="updateQuery" />
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
