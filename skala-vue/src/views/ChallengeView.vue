<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const challenge = computed(() => route.meta.challenge)
const challengeSections = computed(() => {
  if (challenge.value?.sections) {
    return challenge.value.sections
  }

  if (challenge.value?.components) {
    return challenge.value.components.map((component, index) => ({
      title: `실습 ${index + 1}`,
      component,
    }))
  }

  return challenge.value?.component
    ? [{ title: challenge.value.title, component: challenge.value.component }]
    : []
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
      <article v-for="(section, index) in challengeSections" :key="`${challenge.slug}-${index}`" class="challenge-section">
        <header class="challenge-section-heading">
          <span class="challenge-section-number">EXERCISE {{ String(index + 1).padStart(2, '0') }}</span>
          <h2>{{ section.title }}</h2>
          <p v-if="section.description">{{ section.description }}</p>
        </header>
        <component :is="section.component" />
      </article>
    </section>
  </main>

  <main v-else class="empty-state">
    <h1>과제를 찾을 수 없습니다.</h1>
    <RouterLink to="/">메인으로 돌아가기</RouterLink>
  </main>
</template>
