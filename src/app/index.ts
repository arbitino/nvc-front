import { createApp } from 'vue'
import { router, store } from './providers'
import App from './index.vue'

import './style.scss'

export const app = createApp(App).use(router).use(store)
