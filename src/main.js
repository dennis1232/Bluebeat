import vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueSocketIO from 'vue-socket.io'
import './styles/main.scss'



vue.config.productionTip = false
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/'
    : '//localhost:3030'

vue.use(element)
vue.use(new VueSocketIO({
  debug: true,
  connection: BASE_URL,
}))

new vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
