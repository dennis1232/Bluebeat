import vue from 'vue'
import vueRouter from 'vue-router'
import beatHome from '../views/beatHome.vue'
import beatApp from '../views/beatApp.vue'
import beatDetails from '../views/beatDetails.vue'
import beatAdd from '../views/beatAdd.vue'
import beatLogin from '../views/beatLogin.vue'

vue.use(vueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: beatHome
  },
  {
    path: '/beat',
    name: 'beatApp',
    component: beatApp
  },
  {
    path: '/beat/add',
    name: 'beatAdd',
    component: beatAdd
  },
  {
    path: '/beat/:id?',
    name: 'beatDetails',
    component: beatDetails
  },
  {
    path: '/login',
    name: 'beatLogin',
    component: beatLogin
  },
]

const router = new vueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
