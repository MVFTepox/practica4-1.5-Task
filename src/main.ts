import { createApp } from 'vue'
import './assets/style.css'
import router from './Router/Router'
import App from './App.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

pinia.use(piniaPluginPersistedstate)


const app = createApp(App)

app.use(pinia)


app.use(router)

app.mount('#app')


