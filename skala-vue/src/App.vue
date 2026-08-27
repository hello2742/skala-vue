<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/exercise/UnitToggler.vue'
</script>

<template>
  <header class="site-header">
    <RouterLink class="brand" to="/">
      <span class="brand-mark">S</span>
      <span>WEATHER ROUTER</span>
    </RouterLink>

    <nav class="site-nav" aria-label="주요 메뉴">
      <RouterLink to="/">날씨 홈</RouterLink>
      <RouterLink to="/insights">인사이트</RouterLink>
      <RouterLink to="/about">서비스 소개</RouterLink>
      <RouterLink to="/archive">학습 아카이브</RouterLink>
    </nav>
    <UnitToggler />
  </header>

  <RouterView />
</template>
