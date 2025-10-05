import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/income',
      name: 'income',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/TheIncome.vue'),
    },
    {
      path: '/expanse',
      name: 'expanse',
      component: () => import('@/views/TheExpanse.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/views/faq.vue')
    }
  ],

  linkActiveClass: 'active'
})

export default router
