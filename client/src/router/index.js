import { createRouter, createWebHistory } from 'vue-router'
import TeamVue from '../components/TeamVue.vue'
import ClientVue from "../components/ClientVue.vue"
import OrderVue from "../components/OrderVue.vue"
import InvVue from "../components/InvVue.vue"
import DelVue from "../components/DelVue.vue"

const routes = [
  {
    path: '/',
    name: 'teamvue',
    component: TeamVue
  },
  {
    path: '/client/:name',
    name: 'clientDetails',
    component: ClientVue,
  },
  {
    path: '/order/:name',
    name: 'ClientOrder',
    component: OrderVue,
  },
  {
    path: '/inv',
    name: 'inv',
    component: InvVue,
  },
  {
    path: '/del',
    name: 'deliveries',
    component: DelVue,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
});

export default router
