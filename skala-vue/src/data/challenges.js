import EventBasic from '../components/codeChallenges/EventBasic.vue'
import EventModifier from '../components/codeChallenges/EventModifier.vue'
import EventObject from '../components/codeChallenges/EventObject.vue'
import ModelBasic from '../components/codeChallenges/ModelBasic.vue'
import ModelForm from '../components/codeChallenges/ModelForm.vue'
import ModelModifier from '../components/codeChallenges/ModelModifier.vue'
import SampleOne from '../components/codeChallenges/SampleOne.vue'
import SampleTwo from '../components/codeChallenges/SampleTwo.vue'
import VueBind from '../components/codeChallenges/VueBind.vue'
import VueBindClass from '../components/codeChallenges/VueBindClass.vue'
import VueBindShorthand from '../components/codeChallenges/VueBindShorthand.vue'
import VueBindStyle from '../components/codeChallenges/VueBindStyle.vue'
import VueCloak from '../components/codeChallenges/VueCloak.vue'
import VueFor from '../components/codeChallenges/VueFor.vue'
import VueHtml from '../components/codeChallenges/VueHtml.vue'
import VueHtmlXss from '../components/codeChallenges/VueHtmlXss.vue'
import VueIf from '../components/codeChallenges/VueIf.vue'
import VueMemo from '../components/codeChallenges/VueMemo.vue'
import VueOnce from '../components/codeChallenges/VueOnce.vue'
import VuePre from '../components/codeChallenges/VuePre.vue'
import VueShow from '../components/codeChallenges/VueShow.vue'
import VueText from '../components/codeChallenges/VueText.vue'
import LifecycleChild from '../components/codeChallenges/LifecycleChild.vue'
import LifecycleParent from '../components/codeChallenges/LifecycleParent.vue'
// 새 과제는 이 배열에 화면 정보와 컴포넌트를 추가합니다.
// 한 챌린지에 여러 컴포넌트를 넣을 때는 component 대신 components 배열을 사용합니다.
export const challenges = [
  { day: 1, category: 'Vue 기초', slug: 'sample-one', title: 'Vue 반응성 변수 기초', description: '일반 변수와 ref의 차이를 확인합니다.', component: SampleOne },
  { day: 1, category: 'Vue 기초', slug: 'sample-two', title: '템플릿 표현식 기초', description: '템플릿에서 문자열과 표현식을 출력합니다.', component: SampleTwo },
  { day: 1, category: '디렉티브', slug: 'vue-html', title: 'v-html', description: '문자열을 HTML로 렌더링합니다.', component: VueHtml },
  { day: 1, category: '디렉티브', slug: 'vue-html-xss', title: 'v-html과 XSS', description: 'v-html 사용 시 보안 이슈를 확인합니다.', component: VueHtmlXss },
  { day: 1, category: '디렉티브', slug: 'vue-text', title: 'v-text', description: '텍스트 출력 방식들을 비교합니다.', component: VueText },
  { day: 1, category: '디렉티브', slug: 'vue-bind', title: 'v-bind 기본', description: '속성과 상태를 동적으로 바인딩합니다.', component: VueBind },
  { day: 1, category: '디렉티브', slug: 'vue-bind-class', title: 'v-bind 클래스', description: '객체와 배열로 클래스를 바인딩합니다.', component: VueBindClass },
  { day: 1, category: '디렉티브', slug: 'vue-bind-style', title: 'v-bind 스타일', description: '객체와 배열로 스타일을 바인딩합니다.', component: VueBindStyle },
  { day: 1, category: '디렉티브', slug: 'vue-bind-shorthand', title: 'v-bind 단축 문법', description: '최신 v-bind 단축 문법을 확인합니다.', component: VueBindShorthand },
  { day: 1, category: '디렉티브', slug: 'vue-if', title: 'v-if', description: '조건에 따라 엘리먼트를 렌더링합니다.', component: VueIf },
  { day: 1, category: '디렉티브', slug: 'vue-show', title: 'v-show', description: '엘리먼트의 표시 상태를 전환합니다.', component: VueShow },
  { day: 1, category: '디렉티브', slug: 'vue-for', title: 'v-for', description: '배열과 객체를 목록으로 렌더링합니다.', component: VueFor },
  { day: 1, category: '디렉티브', slug: 'vue-pre', title: 'v-pre', description: 'Vue 컴파일을 건너뛰고 출력합니다.', component: VuePre },
  { day: 1, category: '디렉티브', slug: 'vue-cloak', title: 'v-cloak', description: 'Vue 준비 전 템플릿 노출을 방지합니다.', component: VueCloak },
  { day: 1, category: '디렉티브', slug: 'vue-once', title: 'v-once', description: '엘리먼트를 최초 한 번만 렌더링합니다.', component: VueOnce },
  { day: 1, category: '디렉티브', slug: 'vue-memo', title: 'v-memo', description: '의존성이 바뀔 때만 영역을 업데이트합니다.', component: VueMemo },
  { day: 2, category: '이벤트', slug: 'event-basic', title: '이벤트 핸들링 기초', description: '인라인과 메서드로 이벤트를 처리합니다.', component: EventBasic },
  { day: 2, category: '이벤트', slug: 'event-object', title: '이벤트 객체', description: '이벤트 객체에서 정보를 가져옵니다.', component: EventObject },
  { day: 2, category: '이벤트', slug: 'event-modifier', title: '이벤트 수식어', description: 'prevent와 stop 수식어를 확인합니다.', component: EventModifier },
  { day: 2, category: '폼 입력', slug: 'model-basic', title: 'v-model 양방향 바인딩', description: 'v-model과 내부 동작 원리를 확인합니다.', component: ModelBasic },
  { day: 2, category: '폼 입력', slug: 'model-form', title: '폼 요소와 v-model', description: '여러 HTML Form 요소를 연결합니다.', component: ModelForm },
  { day: 2, category: '폼 입력', slug: 'model-modifier', title: 'v-model 수식어', description: 'lazy, number, trim 수식어를 확인합니다.', component: ModelModifier },
  {
    day: 3,
    category: '컴포넌트',
    slug: 'vue-life-cycle',
    title: 'Vue life-cycle 알아보기',
    description: 'Vue의 라이프 사이클을 알아봅시다.',
    components: [LifecycleChild, LifecycleParent],
  },
]
