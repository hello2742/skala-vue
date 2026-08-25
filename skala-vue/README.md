# skala-vue

Vue 과제 컴포넌트를 하루 단위로 기록하는 프로젝트입니다.

## 핸즈온 추가 방법

1. `src/components/handsOn/`에 새 핸즈온 컴포넌트를 만듭니다.
2. `src/data/handsOn.js`에 컴포넌트 import와 핸즈온 정보 객체를 추가합니다.
3. 별도의 라우터 파일을 만들 필요 없이 메인 핸즈온 목록과 `/hands-on/:slug` 화면에 자동으로 연결됩니다.

`HandsOnView.vue`가 공통 View 역할을 하며, 선택한 라우트에서는 등록된 핸즈온 컴포넌트 하나만 렌더링합니다. 화면별로 별도의 상태나 레이아웃이 필요해지는 경우에는 이 공통 View 대신 전용 View를 추가하면 됩니다.

기존 `src/components/codeChallenges/`와 챌린지 목록은 부가 학습용으로 유지되며, 메인 화면의 접힌 챌린지 영역에서 확인할 수 있습니다.

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
- 습도, 풍속, 이모지, 검색 결과 없음 상태, 반응형 카드 레이아웃을 추가했습니다.
- 이후 핸즈온도 같은 구조로 확장할 수 있도록 공통 핸즈온 라우팅과 카드 목록 구조를 유지했습니다.

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
