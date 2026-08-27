import { computed } from 'vue'
import { useConfigStore } from '../stores/configStore'

// 메인 카드와 상세 페이지에서 반복되는 온도 변환 로직을 공통화합니다.
export function useTemperature(getRawTemperature) {
  const configStore = useConfigStore()

  const displayTemp = computed(() => {
    const rawTemp = getRawTemperature()

    if (configStore.unit === 'fahrenheit') {
      return Math.round((rawTemp * 9) / 5 + 32)
    }

    return rawTemp
  })

  return {
    displayTemp,
    unitSymbol: computed(() => configStore.unitSymbol),
  }
}
