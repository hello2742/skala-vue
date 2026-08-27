<script setup>
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'

const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])
const formRef = ref()
const formModel = ref({ query: props.searchQuery })

const rules = {
  query: [
    {
      validator: (_rule, value, callback) => {
        const query = value.trim()
        if (!query || /^[가-힣\s]+$/.test(query)) {
          callback()
          return
        }
        callback(new Error('한글 도시명만 입력해 주세요.'))
      },
      trigger: ['blur', 'change'],
    },
  ],
}

watch(
  () => props.searchQuery,
  (query) => {
    formModel.value.query = query
  },
)

const isValidQuery = (value) => {
  const query = value.trim()
  return !query || /^[가-힣\s]+$/.test(query)
}

const validateQuery = (value) => {
  formModel.value.query = value
  formRef.value.validateField('query').catch(() => {})

  // 검증 UI와 로컬 필터링을 분리해 입력 즉시 검색 결과를 갱신합니다.
  if (isValidQuery(value)) emit('update-query', value.trim())
}
</script>

<template>
  <el-form ref="formRef" class="search-bar" :model="formModel" :rules="rules">
    <el-form-item prop="query">
      <el-input
        v-model="formModel.query"
        :prefix-icon="Search"
        type="text"
        maxlength="10"
        clearable
        placeholder="도시 이름 검색"
        @input="validateQuery"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.search-bar :deep(.el-form-item) {
  width: 100%;
  margin-bottom: 0;
}

.search-bar :deep(.el-input__wrapper) {
  border-radius: 0.65rem;
  box-shadow: 0 0 0 1px #cfdee5 inset;
}

</style>
