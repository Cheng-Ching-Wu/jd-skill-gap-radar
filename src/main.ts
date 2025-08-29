import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const { worker } = await import('./mocks/browser')
await worker.start({
  serviceWorker: { url: '/mockServiceWorker.js' } // 如果 vite.config 有 base，就改成 `${import.meta.env.BASE_URL}mockServiceWorker.js`
})

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
