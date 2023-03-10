import { createApp } from 'vue'
import App from './components/App.vue'
import router from "./router"
import { Quasar } from "quasar"
import quasarLang from "quasar/lang/ja"

import "@quasar/extras/material-icons/material-icons.css"
import "quasar/src/css/index.sass"

const app = createApp(App)
app.use(router)
app.use(Quasar, {
    lang: quasarLang,
    plugins: {},
    config: {},
})
app.mount('#app')
