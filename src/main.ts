import { createApp } from 'vue'
import './assets/style.css'
import router from './Router/Router'
import App from './App.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
import { useAuthStore } from './store/authStore';





const app = createApp(App)

app.use(pinia)


app.use(router)

const auth = useAuthStore();

auth.fetchUsers();
auth.checkAuth();

app.mount('#app')


