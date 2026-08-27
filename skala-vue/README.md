# skala-vue

Vue 과제 컴포넌트를 하루 단위로 기록하는 프로젝트입니다.

핸즈온은 과제가 진행되며 현재 메인 날씨 서비스에 누적 반영하고, README에 학습 기록을 남깁니다. `/archive`에는 코드챌린지 학습 자료만 보관합니다.

## 핸즈온 01. 지역별 날씨 현황

### 구현 내용

- `v-for`로 서울, 수원, 부산, 제주 날씨 카드를 반복 렌더링했습니다.
- 각 카드에 고유한 `id`를 `:key`로 바인딩했습니다.
- 25도 이상/미만에 따라 더움·선선함 라벨을 `v-if`, `v-else`로 표시했습니다.
- `:value`, `@input`으로 한글 도시 검색을 구현했습니다.
- 카드를 클릭하면 선택 상태바가 바뀌고, 상세보기 버튼은 `@click.stop`으로 버블링을 막은 뒤 상세 알림을 표시합니다.
- 과제에서 제시한 데이터 외에 제주, 습도, 풍속, 날씨 이모지를 추가해 카드형 Mockup으로 확장했습니다.

### 느낀 점

반복 렌더링, 조건부 렌더링, 입력 바인딩, 이벤트 수식어가 하나의 화면에서 연결되면서 Vue의 기본 문법이 실제 UI 동작으로 이어지는 과정을 확인할 수 있었습니다. 특히 카드 전체 클릭과 카드 내부 버튼 클릭이 함께 있을 때 `stop` 수식어가 이벤트의 범위를 제어하는 데 유용했습니다.

### 나만의 독창성 및 강조 포인트

- 화면을 `WeatherHandsOnView`와 `WeatherDashboard`로 분리해 페이지 레이아웃과 기능 UI의 책임을 나눴습니다.
- 날씨 상태와 검색·선택·상세보기 로직은 `useWeather` composable로 분리하고, `WeatherCard`는 화면 표현과 이벤트 전달에 집중하도록 구성했습니다.
- 습도, 풍속, 이모지, 체감온도, 미세먼지, 추천 활동, 검색 결과 없음 상태, 반응형 카드 레이아웃을 추가했습니다.
- 이후 핸즈온은 현재 메인 서비스 구조를 확장하는 방식으로 반영합니다.

## 핸즈온 02. 날씨 검색 상태 실험실

### 구현 내용

- `searchQuery`, `selectedCityInfo`, `weatherList`를 `ref`로 정의했습니다.
- 도시 이름을 기준으로 검색 결과를 `filteredWeatherList` computed에 담았습니다.
- 검색어가 비어 있으면 원본 날씨 목록을 출력하고, 검색 결과가 없으면 안내 문구를 출력합니다.
- `watch`로 `selectedCityInfo` 변경을 감시하고 이전 도시와 새 도시를 콘솔에 기록합니다.
- `watchEffect`로 검색어 입력 변화를 추적해 콘솔에 기록합니다.

### 느낀 점

`computed`는 화면에 보여줄 값을 계산하는 역할을 하고, `watch`와 `watchEffect`는 상태 변화가 발생했을 때 별도의 동작을 실행하는 역할이라는 차이를 확인했습니다. 특히 검색 결과 자체는 computed로 만들고, 검색어 변화 로그는 watchEffect로 분리하니 각각의 목적이 더 명확해졌습니다.

### 나만의 독창성 및 강조 포인트

- `showRecommendedOnly` 반응형 상태를 추가해 야외활동에 적합한 도시만 필터링할 수 있게 했습니다.
- `recommendedCity` computed로 현재 날씨 데이터에서 오늘의 추천 도시를 자동으로 계산합니다.
- 추천 필터 변화도 별도의 `watch`로 기록해 상태 감시의 확장 예시를 만들었습니다.
- 1번 핸즈온의 목업 데이터와 `WeatherCard`를 재사용하고, 2번의 상태 관리와 watcher 로직만 별도 composable로 분리했습니다.
- 공통 개발 규칙은 [handsOn-rules.md](./docs/handsOn-rules.md)에 정리했습니다.

## 핸즈온 03. 컴포넌트로 분리한 날씨 대시보드

### 구현 내용

- `WeatherParent.vue`가 날씨 목록, 검색어, 선택 도시, computed, watcher와 이벤트 처리를 관리합니다.
- `BaseDashboardCard.vue`는 공통 카드 디자인과 `<slot>` 영역을 제공합니다.
- `SearchBar.vue`는 검색어를 props로 받고 `update-query` emits로 부모에게 전달합니다.
- `WeatherCard.vue`는 도시 객체를 props로 받고 `select-card`, `click-detail` emits를 발생시킵니다.
- 상세보기 버튼은 `.stop`으로 카드 선택 이벤트와 분리했습니다.
- `WeatherSummary.vue`를 추가해 추천 도시, 체감온도, 미세먼지, 검색 결과 개수를 보여주는 Mockup을 구성했습니다.

### 느낀 점

Slot으로 자식 컴포넌트를 공통 카드 안에 주입하면서도 실제 props와 emits 통신은 부모 스코프에서 처리된다는 점을 확인했습니다. 화면 배치를 담당하는 BaseDashboardCard와 데이터 흐름을 담당하는 WeatherParent를 분리하니 각 컴포넌트의 책임이 더 명확해졌습니다.

### 나만의 독창성 및 강조 포인트

- 기존 날씨 기능을 유지하면서 검색 영역과 날씨 목록 영역을 공통 Slot 카드로 구성했습니다.
- Props → 자식 표시, Emits → 부모 상태 변경의 단방향 데이터 흐름을 명확히 했습니다.
- WeatherSummary를 추가해 날씨 정보를 단순 카드 목록이 아닌 추천 대시보드 Mockup으로 확장했습니다.
- 각 컴포넌트의 디자인을 `style scoped`로 분리했습니다.

## 핸즈온 04. Vue Router 날씨 서비스

### 구현 내용

- `App.vue`에 `RouterLink` 내비게이션과 `RouterView` 메인 콘텐츠 영역을 구성했습니다.
- `/`는 `WeatherHomeView`, `/about`은 `WeatherAboutView`, `/weather/:cityId`는 `WeatherDetailView`로 연결했습니다.
- 상세보기 버튼의 `window.alert`를 제거하고 `router.push()`를 통한 Programmatic Navigation으로 변경했습니다.
- `WeatherDetailView`는 `onMounted` 시 동적 `cityId`를 사용해 Mock Data에서 도시 정보를 찾습니다.
- `WeatherInsightsView`를 추가해 평균 기온, 최고 기온 도시, 공기질 추천 정보를 계산합니다.
- `NotFoundView`와 Catch-all Route를 추가하고, 주요 View에는 Lazy Loading을 적용했습니다.
- 코드챌린지는 `/archive`에서 계속 확인할 수 있습니다.

### 느낀 점

기존에는 하나의 화면 안에서 컴포넌트를 전환했지만, Vue Router를 적용하면서 URL이 화면의 상태와 역할을 표현하게 되었습니다. 특히 동적 경로의 `cityId`를 이용해 같은 상세 View가 여러 도시를 처리하는 방식이 인상적이었습니다.

### 나만의 독창성 및 강조 포인트

- 날씨 홈, 도시 상세, 인사이트 화면을 분리해 하나의 날씨 서비스처럼 구성했습니다.
- 상세 페이지에 체감온도, 미세먼지, 추천 활동 등 기존 목업 데이터를 확장해 표시했습니다.
- `/insights` 추가 View를 만들어 Mock Data를 computed로 가공한 요약 화면을 추가했습니다.
- 잘못된 URL을 위한 404 화면과 기존 학습 아카이브 보존 경로까지 구성했습니다.

## 핸즈온 05. 날씨 단위 설정

### 구현 내용

- Pinia `configStore`에서 현재 날씨 단위(섭씨/화씨)를 전역으로 관리합니다.
- `unitSymbol` Getter로 현재 단위 기호를 반환하고, `toggleUnit()` Action으로 단위를 전환합니다.
- `UnitToggler.vue`를 Navigation Bar 옆에 배치해 사용자가 단위를 변경할 수 있게 했습니다.
- 메인 날씨 카드와 도시 상세 페이지에 현재 단위 기준의 온도를 표시합니다.

### 느낀 점

메인 카드와 상세 페이지에 같은 변환 로직을 각각 작성하면 수정 지점이 늘어납니다. 원본 섭씨 데이터와 전역 설정을 `useTemperature` Composable에 모아 화면 컴포넌트는 표시 역할에 집중하도록 개선했습니다. Pinia Store와 Composable을 함께 사용하면서 전역 상태와 재사용 로직의 책임을 구분할 수 있었습니다.

### 나만의 독창성 및 강조 포인트

- 단위 이름과 기호를 함께 제공해 사용자가 현재 설정을 쉽게 확인할 수 있도록 했습니다.
- 향후 풍속·강수량 등 다른 단위 설정도 `configStore`에 확장할 수 있는 구조로 만들었습니다.

## 핸즈온 06. Axios와 외부 날씨 API

### 구현 내용

- OpenWeatherMap 현재 날씨 API로 도시별 실시간 기온, 상태, 습도, 풍속, 체감온도를 조회합니다.
- OpenWeatherMap 공기질 API를 추가해 도시별 대기질 정보를 표시합니다.
- Open-Meteo 대기질 API도 연동해 PM2.5와 유럽 AQI 데이터를 확장 정보로 활용합니다.
- `useWeatherApi` Composable에서 로딩·오류 상태를 관리합니다.
- Axios Request Interceptor에서 OpenWeatherMap API Key를 주입하고, Response Interceptor에서 응답 형식과 오류를 공통 처리합니다.
- API Key는 `.env`의 `VITE_OPENWEATHER_API_KEY`로 관리하며, `.env.example`을 참고합니다.
- 도시 Catalog의 좌표를 API 요청 파라미터로 사용합니다.

### 느낀 점

Axios를 사용하면서 화면 컴포넌트가 직접 HTTP 요청을 처리하지 않도록 API 서비스와 Composable을 분리했습니다. API Key가 없거나 네트워크 요청이 실패하면 오류 상태를 명확히 표시해 외부 API 의존성을 사용자에게 숨기지 않도록 했습니다.

### 나만의 독창성 및 강조 포인트

- 현재 날씨 API뿐 아니라 공기질 API까지 함께 호출해 단순 기온 표시를 환경 정보 대시보드로 확장했습니다.
- 같은 API 조회 로직을 홈과 상세 페이지에서 재사용하도록 구성했습니다.
- 로딩 상태와 오류 안내를 추가해 외부 API의 현재 상태를 화면에 명확히 전달했습니다.

### API Key 설정

```sh
cp .env.example .env
```

이후 `.env`의 `VITE_OPENWEATHER_API_KEY`에 OpenWeatherMap에서 발급받은 키를 입력합니다. `.env` 파일은 Git에 커밋하지 않습니다.

## 핸즈온 07. Element Plus와 입력 검증

### 구현 내용

- Element Plus의 `el-form`, `el-form-item`, `el-input`을 검색 UI에 적용했습니다.
- 한글 도시명만 허용하고, 공백 입력과 잘못된 형식은 검증 메시지로 안내합니다.
- `BaseDashboardCard`에 `v-loading`을 적용해 API 요청 중 카드 영역의 상태를 표시합니다.
- API 오류와 Mock fallback은 `el-alert`로 표시합니다.
- 기존 카드의 색상·레이아웃은 유지하고, 입력·검증·로딩·오류 처리처럼 UI Library가 필요한 부분만 교체했습니다.

### 느낀 점

검색은 도시 목록이 많아졌을 때 원하는 지역을 빠르게 찾기 위한 기존 핵심 기능입니다. 이번에는 단순히 검색창의 디자인을 바꾸는 데 그치지 않고, 잘못된 입력이 검색 흐름으로 넘어가지 않도록 검증을 추가했습니다. `el-form`과 `el-form-item`을 사용하면서 검증 규칙과 오류 메시지를 일관된 흐름으로 관리할 수 있었습니다.

외부 컴포넌트는 직접 만드는 코드를 줄이는 것보다, 검증 상태·접근성·로딩 상태·사용자 피드백을 표준화하는 데 의미가 있었습니다. `SearchBar`가 입력과 검증을 책임지고 부모 View는 검색 결과와 API 상태에 집중하도록 역할을 분리했습니다.

### 나만의 독창성 및 강조 포인트

- 외부 UI Library를 장식 용도가 아니라 입력값 검증 컴포넌트로 활용했습니다.
- 한글이 아닌 검색어를 API 요청 전에 차단해 불필요한 요청을 줄였습니다.
- 사용하는 컴포넌트와 스타일만 개별 등록해 기존 디자인과 번들 크기를 함께 관리했습니다.
- Element Plus 등록 코드는 `plugins/elementPlus.js`로 분리해 `main.js`가 앱 조립 역할에 집중하도록 했습니다.


## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
