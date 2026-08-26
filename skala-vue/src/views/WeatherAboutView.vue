<template>
  <main class="weather-about-view">
    <section class="about-card">
      <p class="eyebrow">ABOUT THIS WEATHER APP</p>
      <h1>날씨 데이터를<br /><span>읽기 쉬운 화면으로</span></h1>
      <p class="about-description">
        이 프로젝트는 Vue Router를 활용해 지역별 날씨 홈, 상세 기상관측, 서비스 소개 화면을 구성한 학습용 Mockup입니다.
      </p>
      <RouterLink class="about-home-link" to="/">메인 대시보드로 돌아가기</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.weather-about-view {
  width: min(820px, calc(100% - 32px));
  margin: 0 auto;
  padding: 6rem 0;
}

.about-card {
  padding: 3rem;
  border: 1px solid var(--color-border);
  border-radius: 1.4rem;
  background: var(--color-background-soft);
}

.about-card h1 {
  color: var(--color-heading);
  font-size: clamp(2.3rem, 5vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.07em;
}

.about-card h1 span {
  color: var(--color-accent);
}

.about-description {
  max-width: 560px;
  margin-top: 1.5rem;
  color: var(--color-text-muted);
  line-height: 1.8;
}

.about-home-link {
  display: inline-block;
  margin-top: 2rem;
  color: var(--color-accent);
  font-weight: 700;
}
</style>
