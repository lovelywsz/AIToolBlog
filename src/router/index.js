import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/blog/:id',
      component: () => import('../views/BlogDetailView.vue')
    },
    {
      // edit blog
      path: '/blog/:id/edit',
      component: () => import('../views/CreateEditBlogView.vue')
    },
    {
      // create
      path: '/create',
      component: () => import('../views/CreateEditBlogView.vue')
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/myblogs',
      component: () => import('../views/MyBlogsView.vue')
    }
  ]
})

export default router
