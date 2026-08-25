<script setup>
import { challenges } from '../data/challenges'
import { handsOn } from '../data/handsOn'
</script>

<template>
  <main class="home-view">

    <section class="hands-on-section" aria-labelledby="hands-on-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">MAIN PROJECTS</p>
          <h2 id="hands-on-title">Hands On</h2>
        </div>
        <span class="challenge-count">{{ handsOn.length }}개</span>
      </div>

      <div v-if="handsOn.length" class="challenge-grid">
        <RouterLink
          v-for="item in handsOn"
          :key="item.slug"
          class="challenge-card hands-on-card"
          :to="`/hands-on/${item.slug}`"
        >
          <div class="card-topline">
            <span>DAY {{ item.day }}</span>
            <span class="arrow" aria-hidden="true">↗</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </RouterLink>
      </div>

      <div v-else class="hands-on-empty">
        <span class="empty-mark">＋</span>
        <h3>아직 등록된 핸즈온이 없습니다.</h3>
        <p>첫 번째 핸즈온 컴포넌트를 만든 뒤 <code>src/data/handsOn.js</code>에 연결해 주세요.</p>
      </div>
    </section>

    <details class="secondary-section">
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
