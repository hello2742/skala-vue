import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import ElementPlusPlugin from './plugins/elementPlus'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlusPlugin)
app.use(router)

app.mount('#app')
