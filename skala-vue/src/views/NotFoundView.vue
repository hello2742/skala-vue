<template>
  <main class="not-found-view">
    <p class="eyebrow">404 · PAGE NOT FOUND</p>
    <h1>페이지를 찾을 수 없습니다.</h1>
    <p>입력한 주소가 존재하지 않거나 이동된 페이지입니다.</p>
    <RouterLink to="/">날씨 홈으로 돌아가기</RouterLink>
  </main>
</template>

<style scoped>
.not-found-view {
  padding: 8rem 1rem;
  text-align: center;
}

.not-found-view h1 {
  color: var(--color-heading);
  font-size: 2.2rem;
  font-weight: 800;
}

.not-found-view p:not(.eyebrow) {
  margin-top: 0.8rem;
  color: var(--color-text-muted);
}

.not-found-view a {
  display: inline-block;
  margin-top: 1.5rem;
  color: var(--color-accent);
  font-weight: 700;
}
</style>
