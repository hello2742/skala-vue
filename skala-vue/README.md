# skala-vue

Vue 과제 컴포넌트를 하루 단위로 기록하는 프로젝트입니다.

## 핸즈온 추가 방법

1. `src/components/handsOn/`에 새 핸즈온 컴포넌트를 만듭니다.
2. `src/data/handsOn.js`에 컴포넌트 import와 핸즈온 정보 객체를 추가합니다.
3. 별도의 라우터 파일을 만들 필요 없이 메인 핸즈온 목록과 `/hands-on/:slug` 화면에 자동으로 연결됩니다.

`HandsOnView.vue`가 공통 View 역할을 하며, 선택한 라우트에서는 등록된 핸즈온 컴포넌트 하나만 렌더링합니다. 화면별로 별도의 상태나 레이아웃이 필요해지는 경우에는 이 공통 View 대신 전용 View를 추가하면 됩니다.

기존 `src/components/codeChallenges/`와 챌린지 목록은 부가 학습용으로 유지되며, 메인 화면의 접힌 챌린지 영역에서 확인할 수 있습니다.

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
