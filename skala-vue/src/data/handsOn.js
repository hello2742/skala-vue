import WeatherDashboard from '../components/handsOn/WeatherDashboard.vue'
import WeatherHandsOnView from '../views/WeatherHandsOnView.vue'

export const handsOn = [
  {
    day: 1,
    slug: 'weather-dashboard',
    title: '지역별 날씨 현황',
    description: 'v-for, v-if, 검색 바인딩, 이벤트 수식어를 활용한 날씨 대시보드입니다.',
    component: WeatherDashboard,
    view: WeatherHandsOnView,
  },
]
