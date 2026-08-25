import WeatherDashboard from '../components/handsOn/WeatherDashboard.vue'
import WeatherWatchDashboard from '../components/handsOn/WeatherWatchDashboard.vue'
import WeatherHandsOnView from '../views/WeatherHandsOnView.vue'
import WeatherWatchHandsOnView from '../views/WeatherWatchHandsOnView.vue'

export const handsOn = [
  {
    day: 1,
    slug: 'weather-dashboard',
    title: '지역별 날씨 현황',
    description: 'v-for, v-if, 검색 바인딩, 이벤트 수식어를 활용한 날씨 대시보드입니다.',
    component: WeatherDashboard,
    view: WeatherHandsOnView,
  },
  {
    day: 2,
    slug: 'weather-watch',
    title: '날씨 검색 상태 실험실',
    description: 'computed, watch, watchEffect로 날씨 검색 상태의 변화를 확인합니다.',
    component: WeatherWatchDashboard,
    view: WeatherWatchHandsOnView,
  },
]
