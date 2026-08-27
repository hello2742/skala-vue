import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    // [요구사항] 현재 날씨 표시 단위를 저장합니다.
    unit: 'celsius',
  }),

  getters: {
    // [요구사항] 현재 단위에 맞는 기호를 반환합니다.
    unitSymbol: (state) => (state.unit === 'fahrenheit' ? '℉' : '℃'),

    // [나만의 확장] 버튼과 안내 문구에 사용할 단위 이름입니다.
    unitLabel: (state) => (state.unit === 'fahrenheit' ? '화씨' : '섭씨'),
  },

  actions: {
    // [요구사항] 섭씨와 화씨를 번갈아 전환합니다.
    toggleUnit() {
      this.unit = this.unit === 'celsius' ? 'fahrenheit' : 'celsius'
    },
  },
})
