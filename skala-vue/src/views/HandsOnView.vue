<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const handsOn = computed(() => route.meta.handsOn)
const handsOnComponent = computed(() => handsOn.value?.component)
</script>

<template>
  <main v-if="handsOn" class="challenge-view">
    <div class="challenge-heading">
      <div>
        <p class="eyebrow">HANDSON · DAY {{ handsOn.day }}</p>
        <h1>{{ handsOn.title }}</h1>
        <p class="description">{{ handsOn.description }}</p>
      </div>
      <RouterLink class="back-link" to="/">핸즈온 목록 보기</RouterLink>
    </div>

    <section class="challenge-panel">
      <component :is="handsOnComponent" />
    </section>
  </main>

  <main v-else class="empty-state">
    <h1>핸즈온을 찾을 수 없습니다.</h1>
    <RouterLink to="/">메인으로 돌아가기</RouterLink>
  </main>
</template>
