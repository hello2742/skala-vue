import { createRouter, createWebHistory } from 'vue-router'
import { challenges } from '../data/challenges'
import { handsOn } from '../data/handsOn'
import HandsOnView from '../views/HandsOnView.vue'

const challengeRoutes = challenges.map((challenge) => ({
  path: `/challenges/${challenge.slug}`,
  name: `challenge-${challenge.slug}`,
  component: () => import('../views/ChallengeView.vue'),
  meta: { challenge },
}))

const handsOnRoutes = handsOn.map((item) => ({
  path: `/hands-on/${item.slug}`,
  name: `hands-on-${item.slug}`,
  component: item.view ?? HandsOnView,
  meta: { handsOn: item },
}))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'weather-home',
      component: () => import('../views/WeatherHomeView.vue'),
    },
    {
      path: '/about',
      name: 'weather-about',
      component: () => import('../views/WeatherAboutView.vue'),
    },
    {
      path: '/weather/:cityId',
      name: 'weather-detail',
      component: () => import('../views/WeatherDetailView.vue'),
    },
    {
      path: '/insights',
      name: 'weather-insights',
      component: () => import('../views/WeatherInsightsView.vue'),
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('../views/HomeView.vue'),
    },
    ...challengeRoutes,
    ...handsOnRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
