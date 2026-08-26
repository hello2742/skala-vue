<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const challenge = computed(() => route.meta.challenge)
const challengeComponents = computed(() => {
  if (challenge.value?.components) {
    return challenge.value.components
  }

  return challenge.value?.component ? [challenge.value.component] : []
})
</script>

<template>
  <main v-if="challenge" class="challenge-view">
    <div class="challenge-heading">
      <div>
        <p class="eyebrow">DAY {{ challenge.day }} · {{ challenge.category }}</p>
        <h1>{{ challenge.title }}</h1>
        <p class="description">{{ challenge.description }}</p>
      </div>
      <RouterLink class="back-link" to="/">전체 과제 보기</RouterLink>
    </div>

    <section class="challenge-panel">
      <component
        v-for="(challengeComponent, index) in challengeComponents"
        :key="`${challenge.slug}-${index}`"
        :is="challengeComponent"
      />
    </section>
  </main>

  <main v-else class="empty-state">
    <h1>과제를 찾을 수 없습니다.</h1>
    <RouterLink to="/">메인으로 돌아가기</RouterLink>
  </main>
</template>
