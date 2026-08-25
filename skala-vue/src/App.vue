<script setup>
import EventBasic from './components/codeChallenges/EventBasic.vue';
import EventModifier from './components/codeChallenges/EventModifier.vue';
import EventObject from './components/codeChallenges/EventObject.vue';
import VueBind from './components/codeChallenges/VueBind.vue';
import VueBindClass from './components/codeChallenges/VueBindClass.vue';
import VueBindShorthand from './components/codeChallenges/VueBindShorthand.vue';
import VueBindStyle from './components/codeChallenges/VueBindStyle.vue';
import VueCloak from './components/codeChallenges/VueCloak.vue';
import VueFor from './components/codeChallenges/VueFor.vue';
import VueHtml from './components/codeChallenges/VueHtml.vue';
import VueHtmlXss from './components/codeChallenges/VueHtmlXss.vue';
import VueIf from './components/codeChallenges/VueIf.vue';
import VueMemo from './components/codeChallenges/VueMemo.vue';
import VueOnce from './components/codeChallenges/VueOnce.vue';
import VuePre from './components/codeChallenges/VuePre.vue';
import VueShow from './components/codeChallenges/VueShow.vue';
import VueText from './components/codeChallenges/VueText.vue';
</script>

<template>
  <!-- 1일 차 -->
  <!-- <VueHtml></VueHtml>
  <VueHtmlXss></VueHtmlXss>
  <VueText></VueText>

  <VueBind></VueBind>
  <VueBindClass></VueBindClass>
  <VueBindStyle></VueBindStyle>
  <VueBindShorthand></VueBindShorthand>

  <VueIf></VueIf>

  <VueShow></VueShow>

  <VueFor></VueFor>

  <VuePre></VuePre>
  <VueCloak></VueCloak>
  <VueOnce></VueOnce>
  <VueMemo></VueMemo> -->

  <EventBasic></EventBasic>
  <EventObject></EventObject>
  <EventModifier></EventModifier>
  
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
