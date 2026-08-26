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
import PropsEmitsParent from '../components/codeChallenges/PropsEmitsParent.vue'
import SlotDefaultParent from '../components/codeChallenges/SlotDefaultParent.vue'
import SlotNamedParent from '../components/codeChallenges/SlotNamedParent.vue'
import SlotScopedParent from '../components/codeChallenges/SlotScopedParent.vue'
// 새 과제는 이 배열에 화면 정보와 컴포넌트를 추가합니다.
// 한 챌린지에 여러 컴포넌트를 넣고 과제명을 표시할 때는 sections 배열을 사용합니다.
export const challenges = [
  {
    day: 1,
    category: 'Vue 기초',
    slug: 'sample',
    title: 'Vue 기초 샘플',
    description: '반응성 변수와 템플릿 표현식 기초를 함께 확인합니다.',
    sections: [
      { title: '반응성 변수 기초', description: '일반 변수와 ref의 차이를 확인합니다.', component: SampleOne },
      { title: '템플릿 표현식 기초', description: '템플릿에서 문자열과 표현식을 출력합니다.', component: SampleTwo },
    ],
  },
  {
    day: 1,
    category: '디렉티브',
    slug: 'vue',
    title: 'Vue 디렉티브 모음',
    description: 'v-html, v-bind, v-if, v-for 등 Vue 디렉티브를 확인합니다.',
    sections: [
      { title: 'v-html', description: '문자열을 HTML로 렌더링합니다.', component: VueHtml },
      { title: 'v-html과 XSS', description: 'v-html 사용 시 보안 이슈를 확인합니다.', component: VueHtmlXss },
      { title: 'v-text', description: '텍스트 출력 방식들을 비교합니다.', component: VueText },
      { title: 'v-bind 기본', description: '속성과 상태를 동적으로 바인딩합니다.', component: VueBind },
      { title: 'v-bind 클래스', description: '객체와 배열로 클래스를 바인딩합니다.', component: VueBindClass },
      { title: 'v-bind 스타일', description: '객체와 배열로 스타일을 바인딩합니다.', component: VueBindStyle },
      { title: 'v-bind 단축 문법', description: '최신 v-bind 단축 문법을 확인합니다.', component: VueBindShorthand },
      { title: 'v-if', description: '조건에 따라 엘리먼트를 렌더링합니다.', component: VueIf },
      { title: 'v-show', description: '엘리먼트의 표시 상태를 전환합니다.', component: VueShow },
      { title: 'v-for', description: '배열과 객체를 목록으로 렌더링합니다.', component: VueFor },
      { title: 'v-pre', description: 'Vue 컴파일을 건너뛰고 출력합니다.', component: VuePre },
      { title: 'v-cloak', description: 'Vue 준비 전 템플릿 노출을 방지합니다.', component: VueCloak },
      { title: 'v-once', description: '엘리먼트를 최초 한 번만 렌더링합니다.', component: VueOnce },
      { title: 'v-memo', description: '의존성이 바뀔 때만 영역을 업데이트합니다.', component: VueMemo },
    ],
  },
  {
    day: 2,
    category: '이벤트',
    slug: 'event',
    title: 'Vue 이벤트 모음',
    description: '이벤트 핸들링, 이벤트 객체, 이벤트 수식어를 확인합니다.',
    sections: [
      { title: '이벤트 핸들링 기초', description: '인라인과 메서드로 이벤트를 처리합니다.', component: EventBasic },
      { title: '이벤트 객체', description: '이벤트 객체에서 정보를 가져옵니다.', component: EventObject },
      { title: '이벤트 수식어', description: 'prevent와 stop 수식어를 확인합니다.', component: EventModifier },
    ],
  },
  {
    day: 2,
    category: '폼 입력',
    slug: 'model',
    title: 'v-model 폼 입력 모음',
    description: 'v-model 기본, Form 요소, 수식어를 함께 확인합니다.',
    sections: [
      { title: 'v-model 양방향 바인딩', description: 'v-model과 내부 동작 원리를 확인합니다.', component: ModelBasic },
      { title: '폼 요소와 v-model', description: '여러 HTML Form 요소를 연결합니다.', component: ModelForm },
      { title: 'v-model 수식어', description: 'lazy, number, trim 수식어를 확인합니다.', component: ModelModifier },
    ],
  },
  {
    day: 3,
    category: '컴포넌트',
    slug: 'vue-life-cycle',
    title: 'Vue life-cycle 알아보기',
    description: 'Vue의 라이프 사이클을 알아봅시다.',
    sections: [
      { title: 'Lifecycle Child', description: '자식 컴포넌트의 라이프사이클을 확인합니다.', component: LifecycleChild },
      { title: 'Lifecycle Parent', description: '부모 컴포넌트의 라이프사이클을 확인합니다.', component: LifecycleParent },
    ],
  },
  {
    day: 3,
    category: '컴포넌트',
    slug: 'vue-props-emits',
    title: 'Vue Props & Emits',
    description: 'Props로 데이터를 전달하고 Emits로 자식 이벤트를 수신합니다.',
    component: PropsEmitsParent,
  },
  {
    day: 3,
    category: '컴포넌트',
    slug: 'vue-slots',
    title: 'Vue Slots 알아보기',
    description: 'Default Slot, Named Slot, Scoped Slot의 사용 방법을 확인합니다.',
    sections: [
      { title: 'Default Slot', description: '기본 슬롯에 콘텐츠를 주입합니다.', component: SlotDefaultParent },
      { title: 'Named Slot', description: '이름이 있는 슬롯에 콘텐츠를 주입합니다.', component: SlotNamedParent },
      { title: 'Scoped Slot', description: '자식이 전달한 슬롯 데이터를 부모에서 사용합니다.', component: SlotScopedParent },
    ],
  },
]
