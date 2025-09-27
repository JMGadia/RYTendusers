import { createRouter, createWebHistory } from 'vue-router'
import UserLogIn from '../components/UserLogIn.vue' // ⬅️ Corrected relative path
import UserSignUp from '../components/UserSignUp.vue' // ⬅️ Corrected relative path
import OrderingSystem from '../components/OrderingSystem.vue' // ⬅️ Corrected relative path

const routes = [
  {
    path: '/',
    name: 'Login',
    component: UserLogIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: UserSignUp
  },
  {
    path: '/ordering',
    name: 'Ordering',
    component: OrderingSystem
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router