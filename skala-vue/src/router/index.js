import { createRouter, createWebHistory } from 'vue-router'
import { challenges } from '../data/challenges'
import { handsOn } from '../data/handsOn'
import ChallengeView from '../views/ChallengeView.vue'
import HandsOnView from '../views/HandsOnView.vue'
import HomeView from '../views/HomeView.vue'

const challengeRoutes = challenges.map((challenge) => ({
  path: `/challenges/${challenge.slug}`,
  name: `challenge-${challenge.slug}`,
  component: ChallengeView,
  meta: { challenge },
}))

const handsOnRoutes = handsOn.map((item) => ({
  path: `/hands-on/${item.slug}`,
  name: `hands-on-${item.slug}`,
  component: HandsOnView,
  meta: { handsOn: item },
}))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...challengeRoutes,
    ...handsOnRoutes,
  ],
})

export default router
