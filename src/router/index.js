import { createRouter, createWebHistory } from 'vue-router'
import UserLogIn from '../components/UserLogIn.vue' 
import UserSignUp from '../components/UserSignUp.vue'
import OrderingSystem from '../views/OrderingSystem.vue' 
import PaymentSystem from '../components/PaymentSystem.vue'

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
  },
  {
    path: '/payment',
    name: 'Payment',
    component: PaymentSystem
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router