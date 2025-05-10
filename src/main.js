import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import HelloWorld from './components/HelloWorld.vue'
import Budgets from './components/Budgets.vue'
import Projects from './components/Projects.vue'

const routes = [
  { path: '/', redirect: '/budgets' },
  { path: '/hello', component: HelloWorld },
  { path: '/budgets', component: Budgets },
  { path: '/projects', component: Projects }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.mount('#app');
