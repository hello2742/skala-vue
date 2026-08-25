<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="site-header">
    <RouterLink class="brand" to="/">
      <span class="brand-mark">S</span>
      <span>SKALA-VUE</span>
    </RouterLink>
    <nav class="site-nav" aria-label="주요 메뉴">
      <RouterLink to="/">과제 목록</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
