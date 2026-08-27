<script setup>
import { challenges } from '../data/challenges'
</script>

<template>
  <main class="home-view">

    <details class="secondary-section" open>
      <summary>
        <span>
          <span class="eyebrow">Code Challenges</span>
          <strong>챌린지 목록</strong>
        </span>
        <span class="challenge-count">{{ challenges.length }}개</span>
      </summary>

      <div class="challenge-grid secondary-grid">
        <RouterLink
          v-for="challenge in challenges"
          :key="challenge.slug"
          class="challenge-card"
          :to="`/challenges/${challenge.slug}`"
        >
          <div class="card-topline">
            <span>DAY {{ challenge.day }}</span>
            <span class="arrow" aria-hidden="true">↗</span>
          </div>
          <p class="card-category">{{ challenge.category }}</p>
          <h3>{{ challenge.title }}</h3>
          <p>{{ challenge.description }}</p>
        </RouterLink>
      </div>
    </details>
  </main>
</template>
